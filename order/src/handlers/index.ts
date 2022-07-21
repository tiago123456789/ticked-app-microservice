import natsClient from "../configs/nats-client"
import { TicketUpdatedListener, TicketCreated, TicketCreatedListener, TicketUpdated } from "@ticket-app/common"

new TicketCreatedListener(natsClient.getClient(), "ticket_created_queue")
    .setHandleCallback((data: TicketCreated) => {
        console.log(data)
        console.log("!!!!!!!!!!! CREATE !!!!!!!!!!!")
    })
    .listen()

new TicketUpdatedListener(natsClient.getClient(), "ticket_updated_queue")
    .setHandleCallback((data: TicketUpdated) => {
        console.log(data)
        console.log("!!!!!!!!!!! UPDATE !!!!!!!!!!!!")
    })
    .listen()