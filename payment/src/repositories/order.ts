import Order from "../models/order"
import OrderDto from "../dtos/order";

export default class OrderRepository {

    findAllByUserId(userId: string) {
        return Order.find({ userId })
    }

    findByTicketIdAndStatus(ticketId: string, status: string) {
        return Order.findOne({ ticket: ticketId, status })
    }

    findById(id: string | undefined) {
        return Order.findById(id, { __v: 0 })
    }

    create(order: OrderDto) {
        return Order.insertMany([
            order
        ])
    }

    update(id: string | undefined, order: OrderDto) {
        return Order.updateOne({ _id: id }, { $set: order })
    }
}