import ChargeEndpoint from "../endpoints/charge";
import { FactoryInterface } from "./factory-interface";
import { OrderServiceFactory } from "./order-service-factory";


export class ChargeEndpointFactory implements FactoryInterface<ChargeEndpoint> {

    make(data: { [key: string]: any; }): ChargeEndpoint {
        return new ChargeEndpoint(
            new OrderServiceFactory().make({})
        )
    }
}