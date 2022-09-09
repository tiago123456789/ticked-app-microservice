import natsClient from "../configs/nats-client"
import { OrderCancelledListener, OrderCreatedListener, OrderExpiratedListener, TicketUpdatedListener, TicketCreatedListener, TicketUpdated, OrderExpirated, OrderCreated, OrderCancelled } from "@ticket-app/common"
import { TicketServiceFactory } from "../factories/ticket-service-factory"
import OrderService from "../service/order"
import { OrderServiceFactory } from "../factories/order-service-factory"
import order from "../models/order"

const orderService = new OrderServiceFactory().make({})

new OrderCreatedListener(natsClient.getClient())
    .setHandleCallback((data: OrderCreated) => {
        console.log(">>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>")
        console.log(data)
    })
    .listen();

new OrderCancelledListener(natsClient.getClient())
    .setHandleCallback((data: OrderCancelled) => {
        console.log(">>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>")
        console.log(data)
    })
    .listen()