import { Message, Stan, Subscription } from "node-nats-streaming";
import Event from "../events/event";
import Events from "../events/events";

abstract class Listener<T extends Event> {

    protected abstract subject: Events;

    protected abstract ackWait: number;

    private subscribe: Subscription | undefined;

    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    public listen() {
        const options = this.client.subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)

        this.subscribe = this.client.subscribe(this.subject, options)
        this.subscribe.on("message", async (message: Message) => {
            const data: T = JSON.parse(message.getData().toString());
            await this.handle(data);
            message.ack()
        })
    }

    protected abstract handle(data: T): void;
}

export default Listener;