import natsClient from "../configs/nats-client"
import { PaymentApprovedListener, OrderExpiratedListener, TicketUpdatedListener, TicketCreatedListener, TicketUpdated, OrderExpirated, PaymentApproved } from "@ticket-app/common"
import { TicketServiceFactory } from "../factories/ticket-service-factory"
import { OrderServiceFactory } from "../factories/order-service-factory"
import OrderService from "../service/order"

const ticketService = new TicketServiceFactory().make({})
const orderService: OrderService = new OrderServiceFactory().make({})

new PaymentApprovedListener(natsClient.getClient())
    .setHandleCallback(async (data: PaymentApproved) => {
        await orderService.approve(data.orderId)
    })
    .listen()

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
    // @ts-ignore
    await orderService.cancelUsingId(data.id, data.ticketId)
})
.listen()