import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"
import Charge from "../dtos/charge";
import ChargeRepository from "../repositories/charge"

class OrderService {

    private orderRepository: OrderRepository;
    private chargeRepository: ChargeRepository;

    constructor(
        orderRepository = new OrderRepository(),
        chargeRepository = new ChargeRepository()
    ) {
        this.orderRepository = orderRepository;
        this.chargeRepository = chargeRepository
    }

    async charge(data: Charge) {
        const order = await this.orderRepository.findByOrderId(data.orderId);
        await this.chargeRepository.create(order, data.token)
        console.log(order)

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