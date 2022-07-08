import "./loader-envs"
import express from "express"
import "./database"
import "./nats-client"
import { handleException } from "@ticket-app/common";
import routesApp from "../routes/index"
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors())

routesApp(app)

app.use(handleException)

export default app;
