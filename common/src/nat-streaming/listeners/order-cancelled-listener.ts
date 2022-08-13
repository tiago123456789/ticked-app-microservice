import { Stan } from "node-nats-streaming";
import { Events } from "../events/events";
import { OrderCancelled } from "../events/order-cancelled";
import { Listener } from "./listerner";

export class OrderCancelledListener extends Listener<OrderCancelled> {
    protected ackWait: number = 30000;
    protected subject: Events;

    constructor(client: Stan, queueGroupName: string | null = null) {
        super(client, queueGroupName)
        this.subject = Events.ORDER_CANCELLED;
    }

    protected handle(data: OrderCancelled): Promise<any> {
        if (!this.handleCallback) {
            throw new Error("Necessary informate handleCallback")
        }
        return this.handleCallback(data)
    }

}