import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { TicketCreated } from "../events/ticket-created";
import { Listener } from "./listerner";

export class TicketCreatedListener extends Listener<TicketCreated> {
    protected ackWait: number = 30000;
    protected subject: Events = Events.TICKET_CREATED;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
    }

    protected handle(data: TicketCreated): void {
        console.log(data);
    }

}