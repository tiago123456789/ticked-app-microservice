import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { TicketUpdated } from "../events/ticket-updated";
import { Listener } from "./listerner";

export class TicketUpdatedListener extends Listener<TicketUpdated> {
    protected ackWait: number = 30000;
    protected subject: Events;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
        this.subject = Events.TICKET_UPDATED;
    }

    protected handle(data: TicketUpdated): Promise<any>  {
        if (!this.handleCallback) {
            throw new Error("Necessary informate handleCallback")
        }
        return this.handleCallback(data)
    }

}