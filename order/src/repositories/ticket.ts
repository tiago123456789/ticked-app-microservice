import Ticket from "../models/ticket"
import TicketDto from "../dtos/ticket";

export default class TicketRepository {

    findAll() {
        return Ticket.find({ })
    }

    async findByIds(ids: string[]) {
        return Ticket.find({ ticketId: { $in: ids } })
    }

    async findById(id: string | undefined) {
        const registers: any = await Ticket.find({ ticketId: id })
        return registers[0] || null;
    }

    create(ticket: TicketDto) {
        return Ticket.insertMany([
            // @ts-ignore
            {...ticket, ticketId: ticket.id }
        ])
    }

    update(id: string | undefined, user: TicketDto) {
        return Ticket.updateOne({ ticketId: id }, { $set: user })
    }
}