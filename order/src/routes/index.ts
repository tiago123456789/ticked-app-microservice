import { Express } from "express"
import { authorizator, handleException } from "@ticket-app/common"
import OrderEndpoint from "../endpoints/order";
import { OrderEndpointFactory } from "../factories/order-endpoint-factory";

const orderEndpoint: OrderEndpoint = new OrderEndpointFactory().make({})

export default (app: Express) => {

    app.post("/api/orders", authorizator, orderEndpoint.create)
    app.get("/api/orders/:id", authorizator, orderEndpoint.findById)
    app.get("/api/orders", authorizator, orderEndpoint.findAllByUserId)
    app.delete("/api/orders/:id", authorizator, orderEndpoint.cancel)

    app.use(handleException)
   
}