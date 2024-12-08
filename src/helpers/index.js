
import { createClient } from "redis";
import { io } from "../../index.js";

export const hydrateMenu = (productList) => {

  const imageUrl = process.env.IMAGE_URL;
  const  { meals } = productList
  return meals.map((item) => ({
    ...item,
    price: Math.round((Math.random() * 1000), 2),
    imageUrl: `${imageUrl}/${item.strIngredient}.png`,
    imageUrlSmall:`${imageUrl}/${item.strIngredient}-Small.png`,
  }));
};

export const emitEvent = async (socketClientId, event, data)=>{
  
  // Get the incoming socket client
  const socket = io.sockets.sockets.get(socketClientId);
   
  if(!socket.connected){
    // Missed events formatted.
    const eventMissedForDisconnection = JSON.stringify({name: event, data})
    const client = await createClient()
    .on('error', err=>console.log("Error trying to start Redis client.", err))
    .connect(); 

    // Store the info in Redis 
    await client.rPush(`${socketClientId}`, eventMissedForDisconnection);

    // After finished the job release resources.
    await client.quit();
    return;
  };

  socket.emit(event, data);
}

export const getPendingEvent = async (socket)=>{
  
    const client = createClient();

    // Look for pending events from this socket client
    const pendingEvents = await client.lRange(`${socket.id}`, 0, -1);

    //If no event just left
    if(!pendingEvents) return;

    // For every event found, send it to the client
    pendingEvents.forEach((event)=>{
     const {name, data} = JSON.parse(event);
     socket.emit(name, data)
    });
    
    // Remove keys already sent, we don't need it any more.
    client.del(`${socket.id}`);
}
