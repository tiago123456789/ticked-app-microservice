import { OrderCancelled, OrderCancelledPublisher, OrderCreated, OrderCreatedPublisher, Publisher } from "@ticket-app/common";
import OrderRepository from "../repositories/order";
import TicketRepository from "../repositories/ticket";
import OrderService from "../service/order";
import { FactoryInterface } from "./factory-interface";
import natsClient from "../configs/nats-client"


export class OrderServiceFactory implements FactoryInterface<OrderService> {

    make(data: { [key: string]: any; }): OrderService {
        const orderCreatedPublisher: Publisher<OrderCreated> = new OrderCreatedPublisher(natsClient.getClient())
        const orderCancelledPublisher: Publisher<OrderCancelled> = new OrderCancelledPublisher(natsClient.getClient())

        return new OrderService(
            new TicketRepository(),
            new OrderRepository(),
            orderCreatedPublisher,
            orderCancelledPublisher
        )
    }
}