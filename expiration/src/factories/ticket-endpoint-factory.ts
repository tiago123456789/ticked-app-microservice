import TicketEndpoint from "../endpoints/ticket";
import { FactoryInterface } from "./factory-interface";
import { TicketServiceFactory } from "./ticket-service-factory";

export default class UserEndpointFactory implements FactoryInterface<TicketEndpoint> {

    make(data: { [key: string]: any; }): TicketEndpoint {
        return new TicketEndpoint(
            new TicketServiceFactory().make({}),
        )
    }


}