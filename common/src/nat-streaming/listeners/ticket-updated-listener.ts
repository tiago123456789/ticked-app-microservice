import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { TicketUpdated } from "../events/ticket-updated";
import { Listener } from "./listerner";

export class TicketUpdatedListener extends Listener<TicketUpdated> {
    protected ackWait: number = 30000;
    protected subject: Events = Events.TICKET_UPDATED;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
    }

    protected handle(data: TicketUpdated): void {
        console.log(data);
    }

}