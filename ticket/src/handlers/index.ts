import natsClient from "../configs/nats-client"
import { OrderCancelledListener, OrderCreatedListener } from "@ticket-app/common"
import { TicketServiceFactory } from "../factories/ticket-service-factory";
import { OrderCancelled } from "@ticket-app/common/build/nat-streaming/events/order-cancelled";
import { OrderCreated } from "@ticket-app/common/build/nat-streaming/events/order-created";

const ticketService = new TicketServiceFactory().make({});

new OrderCreatedListener(
    natsClient.getClient(), "order_created_queue")
    .setHandleCallback(async (data: OrderCreated) => {
        console.log("LOCK TICKET")
        await ticketService.lock(data.ticketId)
    })
    .listen()


new OrderCancelledListener(
    natsClient.getClient(), "order_cancelled_queue")
    .setHandleCallback(async (data: OrderCancelled) => {
        console.log("UNLOCK TICKET")
        await ticketService.unlock(data.ticketId)
    })
    .listen()
