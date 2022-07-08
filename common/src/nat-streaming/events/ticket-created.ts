import { Event } from "./event";

export interface TicketCreated extends Event {
    id?: string,
    title: string,
    price: number,
    userId: string
}