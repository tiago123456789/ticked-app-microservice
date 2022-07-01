import Event from "./event";

interface TicketUpdated extends Event {
    subject: "ticket:updated"
    data: {
        id: string,
        title: string,
        price: number,
        userId: string
    }
}

export default TicketUpdated