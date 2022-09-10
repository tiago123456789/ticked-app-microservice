import OrderRepository from "../repositories/order";
import OrderService from "../service/order";
import { FactoryInterface } from "./factory-interface";

export class OrderServiceFactory implements FactoryInterface<OrderService> {

    make(data: { [key: string]: any; }): OrderService {
        return new OrderService(
            new OrderRepository(),
        )
    }
}