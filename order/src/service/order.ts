import TicketRepository from "../repositories/ticket";
import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"
import { BusinessLogicException, NotFoundException, OrderStatus } from "@ticket-app/common/build";

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
        // OK -> Find the ticket the user is trying to order in the database
        // Ok -> Make sure that this ticket is not already reserved
        // OK -> Calculate an expiration date for this order
        // OK -> Build the order and save it to the database
        // Publish an event saying that an order was created
    }
}

export default OrderService;