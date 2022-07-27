import OrderEndpoint from "../endpoints/order";
import { FactoryInterface } from "./factory-interface";
import { OrderServiceFactory } from "./order-service-factory";


export class OrderEndpointFactory implements FactoryInterface<OrderEndpoint> {

    make(data: { [key: string]: any; }): OrderEndpoint {
        return new OrderEndpoint(
            new OrderServiceFactory().make({})
        )
    }
}