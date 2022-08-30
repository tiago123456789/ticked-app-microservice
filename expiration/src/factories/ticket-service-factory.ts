import TicketRepository from "../repositories/ticket";
import TicketService from "../service/ticket";
import { FactoryInterface } from "./factory-interface";


export class TicketServiceFactory implements FactoryInterface<TicketService> {

    make(data: { [key: string]: any; }): TicketService {
        return new TicketService(
            new TicketRepository(),
        )
    }
}