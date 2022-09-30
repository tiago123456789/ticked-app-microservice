import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../../components/Header"
import * as authService from "../../services/auth"
import * as ticketService from "../../services/ticket"
import * as orderService from "../../services/order"
import StripeCheckout from "react-stripe-checkout"
import routes from "../../constants/routes"

const TicketDetails = ({ ticket, order }) => {
    const [timeExpiration, setTimeExpiration] = useState(order.expiresAt)
    const [timeleftSeconds, setTimeLeftInSeconds] = useState()

    const isExpired = () => {
        return timeleftSeconds <= 0;
    }

    useEffect(() => {
        const calculeTimeLeftCancelOrder = setInterval(() => {
            // If expired needs call route to order cancel
            const timeLeft = (Math.floor((new Date(timeExpiration) - new Date()) / 1000))
            setTimeLeftInSeconds(timeLeft)
        }, 1000)

        return () => clearInterval(calculeTimeLeftCancelOrder)
    }, [])

    const purchase = (token) => {
        console.log(token)
        // If all things ok create payment for order
    }

    return (
        <>
            <Header />
            <section className="container mt-4">
                {!isExpired() &&
                    <>
                        <p className="alert-danger alert bolder">You have {timeleftSeconds} seconds left before you order cancelled</p>
                        <h3 className="text-capitalize">{ticket.title}</h3>
                        <h4>R$ {ticket.price}</h4>
                        <StripeCheckout
                            amount={parseFloat(ticket.price) * 100}
                            currency={'BRL'}
                            token={purchase}
                            stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
                        />

                    </>
                }

                {isExpired() &&
                    <>
                        <p>Time expired, back ticket page to try purchase ticket again or another ticket</p>
                        <Link href={routes.TICKETS}>
                            <button className="btn btn-primary">Back to Ticket page</button>
                        </Link>
                    </>
                }


                {JSON.stringify(ticket)}
                {JSON.stringify(order)}

            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        const ticket = await ticketService.getById(context.params.id, accessToken)
        const order = await orderService.create({ ticket: context.params.id }, accessToken)
        return {
            props: {
                ticket,
                order
            }
        }
    })
}

export default TicketDetails;