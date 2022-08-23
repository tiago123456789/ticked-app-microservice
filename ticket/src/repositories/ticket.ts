import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";
import ticket from "../models/ticket";
import mongoose, { ObjectId } from "mongoose";

export default class TicketRepository {

    findAll() {
        return Ticket.find({})
    }

    findById(id: string) {
        return Ticket.findById(id, { __v: 0 })
    }

    create(ticket: TicketDto) {
        return Ticket.insertMany([
            ticket
        ])
    }

    update(id: string, user: TicketDto) {
        return Ticket.updateOne({ _id: id }, { $set: user })
    }

    lock(ticketId: string) {
        // @ts-ignore
        return Ticket.findOneAndUpdate(ticketId, { is_lock: true });
    }

    unlock(ticketId: string) {
         // @ts-ignore
        return Ticket.findOneAndUpdate(ticketId, { is_lock: false });
    }
}