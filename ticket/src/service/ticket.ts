import TicketDto from "../dtos/ticket";
import TicketRepository from "../repositories/ticket";
import { NotFoundException } from "@ticket-app/common"

export default class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository
    ) {}

    async findById(id: string) {
        const register = await this.ticketRepository.findById(id);
        if (register == null) {
            throw new NotFoundException("Ticket not found");
        }
        return register;
    }

    findAll() {
        return this.ticketRepository.findAll()
    }

    create(ticket: TicketDto) {
        return this.ticketRepository.create(ticket);
    }

    update(id: string, user: TicketDto) {
        return this.ticketRepository.update(id, user);
    }

}