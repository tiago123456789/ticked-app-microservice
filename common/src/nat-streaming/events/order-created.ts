import { Event } from "./event";

export interface OrderCreated extends Event {
    id?: string,
    ticketId: string;
}