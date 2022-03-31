import dotenv from "dotenv"
dotenv.config()
import express, { Response, Request, NextFunction } from "express"
import * as yup from "yup"
import "./database"
import handlerException from "../middlewares/handler-exception";
import routesApp from "../routes/index"

const app = express();

app.use(express.json())

routesApp(app)

app.use(handlerException)

app.listen(3000, () => {
    console.log("Server is running port 3000")
})