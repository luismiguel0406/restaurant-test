import { readFile, writeFile } from "node:fs/promises";
import { io } from "../../../index.js";

export const postOrderService = async (order) => {

  let prevFileDataParsed = [];
   const prevFileData = await readFile('src/db/orders.json','utf8',(err, data)=>{
    if (err) {
      return console.log(err);
    }
    return data;
   });

   if(prevFileData){
     prevFileDataParsed = JSON.parse(prevFileData);
   }

  await writeFile('src/db/orders.json', JSON.stringify([...prevFileDataParsed, order], null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });

      let index = 0;
      let mlSeconds = 5000;
      let statusOrder = [
        { name: "Order recieved", color: "info" },
        { name: "Preparing", color: "warning" },
        { name: "Ready to deliver", color: "secondary" },
        { name: "Delivered", color: "success" },
      ];

      const interval = setInterval(() => {
        //emitEvent(socket.id,"status-order",statusOrder[index]);
        io.emit("status-order", { client: order.client, status:statusOrder[index] } );
        index += 1;
        if (index >= statusOrder.length) return clearInterval(interval);
      }, mlSeconds);
};
