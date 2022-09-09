
export default class Order {

    public userId?: string;
    public status: string;
    public expiresAt?: Date;
    public ticket?: string;

    constructor(userId: string, status: string, expiresAt: Date, ticket: string) {
        this.userId = userId;
        this.status = status;
        this.expiresAt = expiresAt;
        this.ticket = ticket;
    }

}