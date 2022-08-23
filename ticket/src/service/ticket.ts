import TicketDto from "../dtos/ticket";
import TicketRepository from "../repositories/ticket";
import { BusinessLogicException, NotFoundException, TicketCreated, TicketUpdated } from "@ticket-app/common"

import { Publisher } from "@ticket-app/common"

export default class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly ticketCreatedPublisher: Publisher<TicketCreated>,
        private readonly ticketUpdatedPublisher: Publisher<TicketUpdated>
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

    async create(ticket: TicketDto) {
        const ticketCreated = await this.ticketRepository.create(ticket);
        await this.ticketCreatedPublisher.publish({
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            id: ticketCreated[0]._id
        })
        return ticketCreated;
    }

    lock(ticketId: string) {
        return this.ticketRepository.lock(ticketId)
    }  

    unlock(ticketId: string) {
        return this.ticketRepository.unlock(ticketId)
    }

    async update(id: string, ticket: TicketDto) {
        const register = await await this.findById(id);
        if (register.is_lock == true) {
            throw new BusinessLogicException("You can't update register, because already exist order created to this ticket")
        }
        

        const ticketUpdated = await this.ticketRepository.update(id, ticket);
        await this.ticketUpdatedPublisher.publish({
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            id: id
        })
        return ticketUpdated
    }

}