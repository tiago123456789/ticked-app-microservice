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
}

export default OrderService;