import Events from "../events/events";
import TicketUpdated from "../events/ticket-updated";
import Listener from "./listerner";

class TicketUpdatedListener extends Listener<TicketUpdated> {
    protected ackWait: number = 30000;
    protected subject: Events = Events.TICKET_UPDATED;

    protected handle(data: TicketUpdated): void {
        console.log(data);
    }

}