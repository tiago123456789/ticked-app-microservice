import { Events } from "../events/events";
import { TicketCreated } from "../events/ticket-created";
import { Publisher } from "./publisher";

export class OrderCancelledPublisher extends Publisher<TicketCreated> {
    protected subject: Events = Events.ORDER_CANCELLED;
}