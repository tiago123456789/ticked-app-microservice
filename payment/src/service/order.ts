import OrderRepository from "../repositories/order"
import OrderDto from "../dtos/order"
import Charge from "../dtos/charge";
import ChargeRepository from "../repositories/charge"
import { BusinessLogicException, OrderStatus, PaymentApproved, Publisher } from "@ticket-app/common"

class OrderService {

    private orderRepository: OrderRepository;
    private chargeRepository: ChargeRepository;
    private paymentApprovedPublisher: Publisher<PaymentApproved>;

    constructor(
        orderRepository = new OrderRepository(),
        chargeRepository = new ChargeRepository(),
        paymentApprovedPublisher: Publisher<PaymentApproved>
    ) {
        this.orderRepository = orderRepository;
        this.chargeRepository = chargeRepository;
        this.paymentApprovedPublisher = paymentApprovedPublisher;
    }

    async charge(data: Charge) {
        const order = await this.orderRepository.findByOrderId(data.orderId);

        const isAllowCreatePayment = (order.status === OrderStatus.AWAITING_PAYMENT || order.status == OrderStatus.CREATED);
        if (!isAllowCreatePayment) {
            throw new BusinessLogicException("You can't create charge to order already complete or cancelled")
        }

        await this.chargeRepository.create(order, data.token)
        await  this.paymentApprovedPublisher.publish({
            orderId: data.orderId
        })
        
        // @ts-ignore
        return this.orderRepository.update(
            order._id, 
            { 
                userId: order.userId,
                price: order.price,
                status: OrderStatus.COMPLETE 
            }
        )
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