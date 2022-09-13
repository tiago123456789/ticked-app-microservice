import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"

class OrderService {

    private orderRepository: OrderRepository;

    constructor(
        orderRepository = new OrderRepository(),
    ) {
        this.orderRepository = orderRepository;
    }

    async create(order: OrderDto) {
        return this.orderRepository.create(order);
    }

    async updateByOrderId(orderId: string | undefined, order: OrderDto) {
        return this.orderRepository.updateByOrderId(orderId, order);
    }
}

export default OrderService;