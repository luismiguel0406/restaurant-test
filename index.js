import express from "express";
import helmet from "helmet";
import { createServer } from "node:http";
import productRoutes from "./src/routes/products/products.route.js";
import orderRoutes from "./src/routes/orders/orders.route.js";
import { Server } from "socket.io";
import bodyParser from "body-parser";

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  //to handle temporarily disconnections
  connectionStateRecovery: {},
});

app.use(helmet());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use("/api", productRoutes);
app.use("/api", orderRoutes);


io.on("connection", async (socket) => {
  {
    console.log(`client connected: ${socket.id}`);

    socket.on("new-order", async () => {
      let index = 0;
      let mlSeconds = 5000;
      let statusOrder = [
        "Pedido Recibido",
        "Preparando",
        "Listo para entrega",
        "Entregado",
      ];

      const interval = setInterval(() => {
        io.emit("status-order", statusOrder[index]);
        index += 1;
        if (index >= statusOrder.length) return clearInterval(interval);
      }, mlSeconds);
    });
  }
});

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log("Running at: " + port);
});
