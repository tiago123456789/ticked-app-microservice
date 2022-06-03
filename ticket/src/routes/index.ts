import { Express } from "express"
import TicketEndpoint from "../endpoints/ticket";
import TicketEndpointFactory from "../factories/ticket-endpoint-factory"
import { authorizator, handleException } from "@ticket-app/common"

const ticketEndpointFactory: TicketEndpoint = new TicketEndpointFactory().make({});
export default (app: Express) => {

    app.get("/api/tickets", authorizator, ticketEndpointFactory.findAll)
    app.get("/api/tickets/:id", authorizator, ticketEndpointFactory.findById)
    app.post("/api/tickets", authorizator, ticketEndpointFactory.create)
    app.put("/api/tickets/:id", authorizator, ticketEndpointFactory.update)

    app.use(handleException)
   
}