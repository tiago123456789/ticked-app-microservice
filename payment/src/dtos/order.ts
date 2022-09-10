
export default class Order {

    public userId?: string;
    public price: Number;
    public orderId: string
    public status: string;

    constructor(userId: string, status: string, orderId: string, price: Number) {
        this.userId = userId;
        this.status = status;
        this.orderId = orderId;
        this.price = price;
    }

}