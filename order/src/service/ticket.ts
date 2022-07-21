import TicketDto from "../dtos/ticket";
import TicketRepository from "../repositories/ticket";
import { NotFoundException } from "@ticket-app/common"

export default class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
    ) {
        this.create = this.create.bind(this)
    }

    async findById(id: string | undefined) {
        const register = await this.ticketRepository.findById(id);
        if (register == null) {
            throw new NotFoundException("Ticket not found");
        }
        return register;
    }

    findAll() {
        return this.ticketRepository.findAll()
    }

    async create(ticket: TicketDto) {
        const ticketCreated = await this.ticketRepository.create(ticket);
        return ticketCreated;
    }

    async update(id: string | undefined, ticket: TicketDto) {
        await this.findById(id);
        const ticketUpdated = await this.ticketRepository.update(id, ticket);
        return ticketUpdated
    }

}