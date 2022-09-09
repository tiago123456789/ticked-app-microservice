import natsClient from "../configs/nats-client"
import { OrderExpiratedListener, TicketUpdatedListener, TicketCreatedListener, TicketUpdated, OrderExpirated } from "@ticket-app/common"
import { TicketServiceFactory } from "../factories/ticket-service-factory"
import OrderService from "../service/order"
import { OrderServiceFactory } from "../factories/order-service-factory"
import order from "../models/order"

const ticketService = new TicketServiceFactory().make({})
const orderService = new OrderServiceFactory().make({})

new TicketCreatedListener(natsClient.getClient(), "ticket_created_queue")
    .setHandleCallback(ticketService.create)
    .listen()

new TicketUpdatedListener(natsClient.getClient(), "ticket_updated_queue")
    .setHandleCallback((data: TicketUpdated) => {
        ticketService.update(data.id, data)
    })
    .listen()

new OrderExpiratedListener(natsClient.getClient(), "order_expired_queue")
.setHandleCallback(async (data: OrderExpirated) => {
    console.log("passed on here")
    // @ts-ignore
    await orderService.cancelUsingId(data.id, data.ticketId)
})
.listen()