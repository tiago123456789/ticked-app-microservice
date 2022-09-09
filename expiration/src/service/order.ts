import { OrderCreated, OrderCancelled, Publisher, OrderExpirated } from "@ticket-app/common";

class OrderService {

    constructor(
        private readonly queue: any,
        private readonly orderExpiratedPublisher: Publisher<OrderExpirated>
    ) {}

    settingOrderExpiration(data: OrderCreated) {
        const expiration = new Date(data.expiration)
        const currentDate = new Date();
        const delay = expiration.getTime() - currentDate.getTime()
        console.log(delay)
        this.queue.add(data, { delay: delay })
    }

    notifyOrderExpiration(data: OrderExpirated) {
        return this.orderExpiratedPublisher.publish(data)
    }
}

export default OrderService;