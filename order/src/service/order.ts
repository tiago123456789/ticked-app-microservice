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


    async create(order: OrderDto) {
        if (!mongoose.isValidObjectId(order.ticket)) {
            throw new NotFoundException("Ticket not found")
        }
        const ticket = await this.ticketRepository.findById(order.ticket)
        if (!ticket) {
            throw new NotFoundException("Ticket not found")
        }

        const orderToTicket = await this.orderRepository.findByTicketIdAndStatus(
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