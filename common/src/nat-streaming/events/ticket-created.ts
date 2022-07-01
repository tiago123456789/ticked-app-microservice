import Event from "./event";

interface TicketCreated extends Event {
    subject: "ticket:created"
    data: {
        id: string,
        title: string,
        price: number,
        userId: string
    }
}

export default TicketCreated