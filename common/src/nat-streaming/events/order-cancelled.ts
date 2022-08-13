import { Event } from "./event";

export interface OrderCancelled extends Event {
    id?: string,
    ticketId: string;
}