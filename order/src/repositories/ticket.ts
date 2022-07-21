import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";

export default class TicketRepository {

    findAll() {
        return Ticket.find({ })
    }

    findById(id: string | undefined) {
        return Ticket.findById(id, { __v: 0 })
    }

    create(ticket: TicketDto) {
        return Ticket.insertMany([
            ticket
        ])
    }

    update(id: string | undefined, user: TicketDto) {
        return Ticket.updateOne({ _id: id }, { $set: user })
    }
}