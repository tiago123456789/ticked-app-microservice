import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { TicketCreated } from "../events/ticket-created";
import { Listener } from "./listerner";

export class TicketCreatedListener extends Listener<TicketCreated> {
    protected ackWait: number = 30000;
    protected subject: Events;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
        this.subject = Events.TICKET_CREATED;
    }

    protected handle(data: TicketCreated): Promise<any> {
        if (!this.handleCallback) {
            throw new Error("Necessary informate handleCallback")
        }
        return this.handleCallback(data)
    }

}