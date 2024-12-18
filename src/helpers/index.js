
import { redisClient, io } from "../../index.js";

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

export const emitEvent = async (socketId, clientId, event, data)=>{
  
  // Get the incoming socket client
  const socket = io.sockets.sockets.get(socketId);
   
  if(!socket){
    // Missed events formatted.
    const eventMissedForDisconnection = JSON.stringify({ event, data}); 

    if(!redisClient.isOpen){
     await redisClient.connect();
    }
    // Store the info in Redis 
    await redisClient.rPush(`${clientId}`, eventMissedForDisconnection);

    // After finished the job release resources.
    //await redisClient.quit();
    return;
  };

  socket.emit(event, data);
}

export const getPendingEvent = async (socket, clientId)=>{
    if(!redisClient.isOpen){
      await redisClient.connect();
    }
    // Look for pending events from this socket client
    const pendingEvents = await redisClient.lRange(`${clientId}`, 0, -1);

    //If no event just left
    if(pendingEvents.length === 0) return;

    // For every event found, send it to the client
    pendingEvents.forEach((pendingEvent)=>{
     const {event, data} = JSON.parse(pendingEvent);
     emitEvent(socket.id, clientId, event, data) // OR METHOD "socket.emit()"
    });
    
    // Remove keys already sent, we don't need it any more.
   await redisClient.del(`${clientId}`);
}
