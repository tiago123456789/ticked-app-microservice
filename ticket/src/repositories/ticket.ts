import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";
import ticket from "../models/ticket";

export default class TicketRepository {

    findAll() {
        return Ticket.find({ })
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
        return Ticket.updateOne({ _id: ticketId }, { $set: { is_locked: true } })
    }

    unlock(ticketId: string) {
        return Ticket.updateOne({ _id: ticketId }, { $set: { is_locked: false } })
    }
}