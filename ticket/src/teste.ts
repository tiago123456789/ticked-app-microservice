import Nat from "node-nats-streaming"
import { randomBytes } from "crypto"
import { TicketCreatedListener } from "@ticket-app/common"

const stan = Nat.connect('ticketing', randomBytes(4).toString("hex"))

stan.on("connect", async () => {
    const ticketCreatedListener = new TicketCreatedListener(stan)

    await ticketCreatedListener.listen()
})


