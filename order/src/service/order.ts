import TicketRepository from "../repositories/ticket";
import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"
import { BusinessLogicException, NotFoundException, OrderStatus, Publisher } from "@ticket-app/common/build";
import mongoose from "mongoose";
import { OrderCreated, OrderCancelled } from "@ticket-app/common";

class OrderService {

    private ticketRepository: TicketRepository;
    private orderRepository: OrderRepository;

    constructor(
        ticketRepository = new TicketRepository(),
        orderRepository = new OrderRepository(),
        private orderCreatedPublisher: Publisher<OrderCreated>,
        private orderCancelledPublisher: Publisher<OrderCancelled>,
    ) {
        this.ticketRepository = ticketRepository;
        this.orderRepository = orderRepository;
    }

    async cancelUsingId(id: string, ticketId: string) {
        const order = await this.orderRepository.findById(id);
        if (order.status == OrderStatus.COMPLETE) {
            return;
        }
        
        await this.orderRepository.update(id, { status: OrderStatus.CANCELLED })
        await this.orderCancelledPublisher.publish({
            // @ts-ignore
            id: id,
            status: "",
            userId: "",
            price: 0,
            ticketId: ticketId
        })
    }

    async cancel(id: string, userId: string) {
        const order = await this.findById(id, userId)
        const ticket = await this.ticketRepository.findById(order.ticket._id)
        await this.orderRepository.update(id, { status: OrderStatus.CANCELLED })
        await this.orderCancelledPublisher.publish({
            // @ts-ignore
            id: id,
            ticketId: order.ticket._id,
            // @ts-ignore
            ticketId: order.ticket,
            // @ts-ignore
            status: OrderStatus.CANCELLED,
            // @ts-ignore
            userId: order.userId,
            price: ticket.price
        })
    }

    async findAllByUserId(userId: string) {
        const registers = await this.orderRepository.findAllByUserId(userId)
        const mapOrderByTicket: { [key: string]: any } = {}
        const ticketIds = registers.map(item => {
            mapOrderByTicket[item.ticket] = item;
            return item.ticket 
        })
        const tickets = await this.ticketRepository.findByIds(ticketIds)
        const results = tickets.map(ticket => {

            const order = mapOrderByTicket[ticket.ticketId];
            return {
                title: ticket.title,
                price: ticket.price,
                _id: mapOrderByTicket[ticket.ticketId]._id
            }
        })

        return results;
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

    async create(order: OrderDto, userId: string) {
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

        // if (orderToTicket) {
        //     throw new BusinessLogicException("You can't make order because ticket already reserved")
        // }

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 15)
        order.expiresAt = currentDate;
        order.status = OrderStatus.CREATED;

        const orderCreated = await this.orderRepository.create(order);
        await this.orderCreatedPublisher.publish({
            // @ts-ignore
            id: orderCreated[0]._id,
            expiration: currentDate,
            // @ts-ignore
            ticketId: order.ticket,
            status: order.status,
            userId: userId,
            price: ticket.price
        })

        return orderCreated[0];
    }

    async approve(id: string) {
        return this.orderRepository.update(id, { status: OrderStatus.COMPLETE })
    }
}

export default OrderService;