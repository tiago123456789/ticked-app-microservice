import { Message, Stan, Subscription } from "node-nats-streaming";
import { Event } from "../events/event";
import { Events } from "../events/events";

export abstract class Listener<T extends Event> {

    protected queueGroupName: string | null = null;

    protected abstract subject: Events;

    protected abstract ackWait: number;

    private subscribe: Subscription | undefined;

    private client: Stan;

    protected handleCallback: CallableFunction | undefined;

    constructor(client: Stan, queueGroupName: string | null) {
        this.client = client;
        this.queueGroupName = queueGroupName;
    }

    public setHandleCallback(callback: CallableFunction) {
        this.handleCallback = callback;
        return this;
    }

    public listen() {
        this.client.on("connect", async () => {
            const options = this.client.subscriptionOptions()
                .setManualAckMode(true)
                .setAckWait(this.ackWait)

            this.subscribe = this.client.subscribe(this.subject, options)

            if (this.queueGroupName) {
                this.subscribe = this.client.subscribe(
                    this.subject, this.queueGroupName, options
                )
            }

            this.subscribe.on("message", async (message: Message) => {
                const data: T = JSON.parse(message.getData().toString());
                await this.handle(data);
                message.ack()
            })
        })

    }

    protected abstract handle(data: T): Promise<any>;
}
