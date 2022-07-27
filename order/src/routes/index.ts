import { Express } from "express"
import { authorizator, handleException } from "@ticket-app/common"
import OrderEndpoint from "../endpoints/order";
import { OrderEndpointFactory } from "../factories/order-endpoint-factory";

const orderEndpoint: OrderEndpoint = new OrderEndpointFactory().make({})

export default (app: Express) => {

    // ROUTES TO IMPLEMENT: 
    // GET /api/orders -> List user orders
    // GET /api/orders/:id -> get data about specific order
    // POST /api/orders -> create one order
    // DELETE /api/orders -> this route not delete register, only update order status for cancelled

    app.post("/api/orders", authorizator, orderEndpoint.create)
    // app.get("/api/tickets", authorizator, ticketEndpointFactory.findAll)
    // app.get("/api/tickets/:id", authorizator, ticketEndpointFactory.findById)
    // app.post("/api/tickets", authorizator, ticketEndpointFactory.create)
    // app.put("/api/tickets/:id", authorizator, ticketEndpointFactory.update)

    app.use(handleException)
   
}