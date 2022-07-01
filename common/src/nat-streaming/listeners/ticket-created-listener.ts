import Events from "../events/events";
import TicketCreated from "../events/ticket-created";
import Listener from "./listerner";

export default class TicketCreatedListener extends Listener<TicketCreated> {
    protected ackWait: number = 30000;
    protected subject: Events = Events.TICKET_CREATED;

    protected handle(data: TicketCreated): void {
        console.log(data);
    }

}