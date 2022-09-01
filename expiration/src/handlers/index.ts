import natsClient from "../configs/nats-client"
import { OrderCreatedListener, OrderCreated } from "@ticket-app/common"
import { getQueue } from "../configs/BullQueue"
import QueueName from "../utils/QueueName";
import { OrderServiceFactory } from "../factories/order-service-factory";

const orderExpirationQueue = getQueue(QueueName.ORDER_EXPIRATION)

const orderService = new OrderServiceFactory().make({})

new OrderCreatedListener(natsClient.getClient(), "order_expiration_queue") 
    .setHandleCallback(async (data: OrderCreated) => {
       await orderService.settingOrderExpiration(data)
    })
    .listen();

orderExpirationQueue.process(async (job: any, done: CallableFunction) => {
    await orderService.notifyOrderExpiration(job.data)
    done();
})