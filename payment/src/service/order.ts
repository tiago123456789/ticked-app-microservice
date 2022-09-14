import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"

class OrderService {

    private orderRepository: OrderRepository;

    constructor(
        orderRepository = new OrderRepository(),
    ) {
        this.orderRepository = orderRepository;
    }

    charge(orderId) {
        const order = this.orderRepository.findByOrderId(orderId);
        
    }

    async create(order: OrderDto) {
        return this.orderRepository.create(order);
    }

    async updateByOrderId(orderId: string | undefined, order: OrderDto) {
        const orderReturned = await this.orderRepository.findByOrderId(orderId)
        return this.orderRepository.update(orderReturned._id, order);
    }
}

export default OrderService;