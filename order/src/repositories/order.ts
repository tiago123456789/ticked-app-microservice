import Order from "../models/order"
import OrderDto from "../dtos/order";

export default class OrderRepository {


    findAll() {
        return Order.find({ })
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