import { Publisher } from "./publisher";
import { TicketUpdated } from "../events/ticket-updated"
import { Events } from "../events/events";

export class TicketUpdatedPublisher extends Publisher<TicketUpdated> {
    protected subject: Events = Events.TICKET_UPDATED;
}