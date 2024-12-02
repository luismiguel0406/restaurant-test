import express from "express";
import helmet from "helmet";
import {createServer} from "node:http";
import productRouter from "./src/routes/products/products.route.js"

const app = express();
const httpServer =  createServer(app);


app.use(helmet());
app.use(productRouter);


const port = process.env.PORT;

httpServer.listen(port, ()=>{
    console.log("Running at: " + port);
})

