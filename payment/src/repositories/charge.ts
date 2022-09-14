import Stripe from "stripe"
import Order from "../dtos/order";

class ChargeRepository {

    private client: Stripe;

    constructor() {
        this.client = new Stripe(process.env.STRIPE_PUBLISH_KEY, {
            apiVersion: '2022-08-01',
        })
    }

    async create(order: Order, token) {
        const charge = await this.client.charges.create({
            currency: 'BRL',
            // @ts-ignore
            amount: parseFloat(order.price) * 100,
            source: token,
        })
    }
}

export default ChargeRepository;