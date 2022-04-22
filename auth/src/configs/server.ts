import "./loader-envs"
import express from "express"
import "./database"
import handlerException from "../middlewares/handler-exception";
import routesApp from "../routes/index"

const app = express();

app.use(express.json())

routesApp(app)

app.use(handlerException)

export default app;
