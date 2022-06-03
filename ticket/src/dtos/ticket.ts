
export default class Ticket {

    public title: string;
    public price: number;
    public userId: string;

    constructor(title: string, price: number, userId: string) {
        this.title = title,
        this.price = price 
        this.userId = userId;
    }

}