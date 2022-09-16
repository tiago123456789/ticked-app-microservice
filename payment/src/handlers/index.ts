import natsClient from "../configs/nats-client"
import { OrderCancelledListener, OrderCreatedListener, OrderCreated, OrderCancelled } from "@ticket-app/common"
import { OrderServiceFactory } from "../factories/order-service-factory"
import Order from "../dtos/order"

const orderService = new OrderServiceFactory().make({})

new OrderCreatedListener(natsClient.getClient())
    .setHandleCallback(async (data: OrderCreated) => {
        const orderDto = new Order(
            data.userId, data.status, data.id, data.price
        )
        await orderService.create(orderDto)
    })
    .listen();

new OrderCancelledListener(natsClient.getClient())
    .setHandleCallback(async (data: OrderCancelled) => {
        const orderDto = new Order(
            data.userId, data.status, data.id, data.price
        )
        await orderService.updateByOrderId(data.id, orderDto)
    })
    .listen()