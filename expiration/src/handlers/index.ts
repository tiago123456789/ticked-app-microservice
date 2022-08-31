import natsClient from "../configs/nats-client"
import { OrderCreatedListener, OrderCreated } from "@ticket-app/common"
import { getQueue } from "../configs/BullQueue"
import QueueName from "../utils/QueueName";

const orderExpirationQueue = getQueue(QueueName.ORDER_EXPIRATION)

new OrderCreatedListener(natsClient.getClient(), "order_expiration_queue") 
    .setHandleCallback((data: OrderCreated) => {
        const expiration = new Date(data.expiration)
        const currentDate = new Date();
        const delay = expiration.getTime() - currentDate.getTime()
        console.log(data)

        orderExpirationQueue.add(data, { delay: 0 })
    })
    .listen();

orderExpirationQueue.process((job: any, done: CallableFunction) => {
    console.log(job.data)
    console.log("@@@@@@@@@@@@@")
    done();
})