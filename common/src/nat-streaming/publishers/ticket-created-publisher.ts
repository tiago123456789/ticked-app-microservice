import { Events } from "../events/events";
import { TicketCreated } from "../events/ticket-created";
import { Publisher } from "./publisher";

export class TicketCreatedPublisher extends Publisher<TicketCreated> {
    protected subject: Events = Events.TICKET_CREATED;
}