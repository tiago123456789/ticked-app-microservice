import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";

export default class TicketRepository {

    findAll() {
        return Ticket.find({ })
    }

    async findById(id: string | undefined) {
        const registers: any = await Ticket.find({ id: id })
        return registers[0] || null;
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