import natsClient from "../configs/nats-client"
import { TicketUpdatedListener, TicketCreatedListener, TicketUpdated } from "@ticket-app/common"
import { TicketServiceFactory } from "../factories/ticket-service-factory"

const ticketService = new TicketServiceFactory().make({})

new TicketCreatedListener(natsClient.getClient(), "ticket_created_queue")
    .setHandleCallback(ticketService.create)
    .listen()

new TicketUpdatedListener(natsClient.getClient(), "ticket_updated_queue")
    .setHandleCallback((data: TicketUpdated) => {
        ticketService.update(data.id, data)
    })
    .listen()