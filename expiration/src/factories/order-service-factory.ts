import { OrderCancelled, OrderCancelledPublisher, OrderCreated, OrderCreatedPublisher, OrderExpiratedPublisher, Publisher } from "@ticket-app/common";
import OrderRepository from "../repositories/order";
import TicketRepository from "../repositories/ticket";
import OrderService from "../service/order";
import { FactoryInterface } from "./factory-interface";
import natsClient from "../configs/nats-client"
import { getQueue } from "../configs/BullQueue";
import QueueName from "../utils/QueueName";


export class OrderServiceFactory implements FactoryInterface<OrderService> {

    make(data: { [key: string]: any; }): OrderService {
        const orderExpiratedPublisher = new OrderExpiratedPublisher(
            natsClient.getClient()
        )
        
        return new OrderService(
            getQueue(QueueName.ORDER_EXPIRATION),
            orderExpiratedPublisher
        )
    }
}