import Stripe from "stripe"
import Order from "../dtos/order";
import Charge from "../models/charge";

class ChargeRepository {

    private client: Stripe;

    constructor() {
        // @ts-ignore
        this.client = new Stripe(process.env.STRIPE_PUBLISH_KEY, {
            apiVersion: '2022-08-01',
        })
    }

    async create(order: Order, token: string) {
        const charge = await this.client.charges.create({
            currency: 'BRL',
            // @ts-ignore
            amount: parseFloat(order.price) * 100,
            source: token,
        })

        return Charge.create({
            transactionId: charge.id,
            orderId: order.orderId
        })
    }
}

export default ChargeRepository;