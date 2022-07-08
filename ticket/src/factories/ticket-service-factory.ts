import { TicketCreatedPublisher, TicketUpdatedPublisher } from "@ticket-app/common/build";
import TicketRepository from "../repositories/ticket";
import TicketService from "../service/ticket";
import { FactoryInterface } from "./factory-interface";
import natsClient from "../configs/nats-client"


export class TicketServiceFactory implements FactoryInterface<TicketService> {

    make(data: { [key: string]: any; }): TicketService {
        return new TicketService(
            new TicketRepository(),
            new TicketCreatedPublisher(natsClient.getClient()),
            new TicketUpdatedPublisher(natsClient.getClient()),
        )
    }
}