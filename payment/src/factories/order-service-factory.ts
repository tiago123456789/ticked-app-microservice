import { PaymentApprovedPublisher, Publisher } from "@ticket-app/common/build";
import OrderRepository from "../repositories/order";
import OrderService from "../service/order";
import { FactoryInterface } from "./factory-interface";
import natsClient from "../configs/nats-client"
import ChargeRepository from "../repositories/charge";

export class OrderServiceFactory implements FactoryInterface<OrderService> {
    make(data: { [key: string]: any; }): OrderService {
        const paymentApprovedPublisher = new PaymentApprovedPublisher(natsClient.getClient())
        
        return new OrderService(
            new OrderRepository(),
            new ChargeRepository(),
            paymentApprovedPublisher
        )
    }
}