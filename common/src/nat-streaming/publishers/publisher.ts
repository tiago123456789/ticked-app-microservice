import { Event } from "../events/event";
import { Stan } from "node-nats-streaming"
import { Events } from "../events/events";

export abstract class Publisher<T extends Event> {

    private client: Stan;

    protected abstract subject: Events;

    constructor(client: Stan) {
        this.client = client;
    }

    publish(data: T) {
        return new Promise((resolve, reject) => {
            return this.client.publish(this.subject, JSON.stringify(data), () => {
                resolve(null);
            })
        })
    }
}