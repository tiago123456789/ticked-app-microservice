import { Event } from "./event";

export interface TicketUpdated extends Event {
    id?: string,
    title: string,
    price: number,
    userId: string
}