import { assert } from "node:console";
//import jsonData from "../../db/orders.json" assert { type: 'json'};
import fs from "node:fs";


export const postOrderService = async (order) => {
   fs.appendFile('src/db/order.json', JSON.stringify(order, null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};
