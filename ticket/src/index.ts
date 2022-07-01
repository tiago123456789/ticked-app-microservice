import app from "./configs/server"
import Nat from "node-nats-streaming"
import { TicketCreatedListener, TicketCreatedPublisher } from "@ticket-app/common"

const stan = Nat.connect('ticketing', 'test')

stan.on("connect", async () => {
    const ticketCreatedListener = new TicketCreatedListener(stan)
    const ticketCreatedPublisher = new TicketCreatedPublisher(stan)
    await ticketCreatedPublisher.publish({
        price: 10, title: "Hi", userId: "1", id: "1"
    })
    console.log("executed publisher")

    await ticketCreatedListener.listen()
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`)
})
