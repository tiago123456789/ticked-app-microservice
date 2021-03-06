import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";

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
}