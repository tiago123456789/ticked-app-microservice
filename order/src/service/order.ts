import TicketRepository from "../repositories/ticket";
import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"
import { BusinessLogicException, NotFoundException, OrderStatus } from "@ticket-app/common/build";
import mongoose from "mongoose";

class OrderService {

    private ticketRepository: TicketRepository;
    private orderRepository: OrderRepository;

    constructor(
        ticketRepository = new TicketRepository(),
        orderRepository = new OrderRepository()
    ) {
        this.ticketRepository = ticketRepository;
        this.orderRepository = orderRepository;
    }

    async cancel(id: string, userId: string) {
        await this.findById(id, userId)
        return this.orderRepository.update(id, { status: OrderStatus.CANCELLED })
    }

    findAllByUserId(userId: string) {
        return this.orderRepository.findAllByUserId(userId)
    }

    async findById(id: string, userId: string) {
        const register = await this.orderRepository.findById(id)

        if (!register) {
            throw new NotFoundException("Order not found")
        }

        if (register.userId != userId) {
            throw new NotFoundException("Order not found")
        }

        return register
    }

    async create(order: OrderDto) {
        if (!mongoose.isValidObjectId(order.ticket)) {
            throw new NotFoundException("Ticket not found")
        }
        const ticket = await this.ticketRepository.findById(order.ticket)
        if (!ticket) {
            throw new NotFoundException("Ticket not found")
        }

        const orderToTicket = await this.orderRepository.findByTicketIdAndStatus(
            // @ts-ignore
            order.ticket, OrderStatus.CREATED
        )

        if (orderToTicket) {
            throw new BusinessLogicException("You can't make order because ticket already reserved")
        }

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 15)
        order.expiresAt = currentDate;
        order.status = OrderStatus.CREATED;
        
        await this.orderRepository.create(order)
    }
}

export default OrderService;