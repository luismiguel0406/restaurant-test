import express from "express";
import helmet from "helmet";
import { createServer } from "node:http";
import productRoutes from "./src/routes/products/products.route.js";
import orderRoutes from "./src/routes/orders/orders.route.js";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors"
import { getPendingEvent } from "./src/helpers/index.js";
import { createClient } from "redis";


const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  //to handle temporarily disconnections
  connectionStateRecovery: {},
  cors:{
    origin:"*"
  }
});

export const redisClient = createClient()
.on('error', err=>console.log("Error trying to start Redis client.", err))

app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(_req,res)=>{
  res.send("<h1>Api Online</h1>")
  })

app.use("/api", productRoutes);
app.use("/api", orderRoutes);




io.on("connection", async (socket) => {
    console.log(`client connected: ${socket.id}`);
    await getPendingEvent(socket);
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log("Running at: " + port);
});
