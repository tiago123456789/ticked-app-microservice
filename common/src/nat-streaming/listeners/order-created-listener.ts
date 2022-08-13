import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { OrderCreated } from "../events/order-created";
import { TicketCreated } from "../events/ticket-created";
import { Listener } from "./listerner";

export class OrderCreatedListener extends Listener<OrderCreated> {
    protected ackWait: number = 30000;
    protected subject: Events;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
        this.subject = Events.ORDER_CREATED;
    }

    protected handle(data: OrderCreated): Promise<any> {
        if (!this.handleCallback) {
            throw new Error("Necessary informate handleCallback")
        }
        return this.handleCallback(data)
    }

}