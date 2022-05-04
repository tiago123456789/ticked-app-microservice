import "./loader-envs"
import express from "express"
import "./database"
import handlerException from "../middlewares/handler-exception";
import routesApp from "../routes/index"
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors())

routesApp(app)

app.use(handlerException)

export default app;
