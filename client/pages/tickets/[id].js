import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../../components/Header"
import * as authService from "../../services/auth"
import * as ticketService from "../../services/ticket"
import * as orderService from "../../services/order"
import StripeCheckout from "react-stripe-checkout"
import routes from "../../constants/routes"
import Alert from "../../components/Alert"
import { ALERT_SUCCESS } from "../../constants/alert";

const TicketDetails = ({ ticket, order, accessToken }) => {
    const [timer, setTimer] = useState(null)
    const [error, setError] = useState({})
    const [timeExpiration, setTimeExpiration] = useState(order.expiresAt)
    const [timeleftSeconds, setTimeLeftInSeconds] = useState()
    const [isPurchased, setIsPurchased] = useState(false)

    const isExpired = () => {
        return timeleftSeconds <= 0;
    }

    const applyOrderCancel = async (timeLeft, calculeTimeLeftCancelOrder) => {
        if (timeLeft <= 0) {
            clearInterval(calculeTimeLeftCancelOrder)
            await orderService.cancel(order._id, accessToken)
        }
    }

    useEffect(() => {
        const calculeTimeLeftCancelOrder = setInterval(async () => {
            const timeLeft = (Math.floor((new Date(timeExpiration) - new Date()) / 1000))
            setTimeLeftInSeconds(timeLeft)
            await applyOrderCancel(timeLeft, calculeTimeLeftCancelOrder)
        }, 1000)

        setTimer(calculeTimeLeftCancelOrder)
        return () => clearInterval(calculeTimeLeftCancelOrder)
    }, [])

    const purchase = async (token) => {
        await orderService.charge(
            {
                token: token.id,
                orderId: order._id
            },
            accessToken
        )

        clearInterval(timer)
        setIsPurchased(true)
        setError({
            type: ALERT_SUCCESS,
            message: "Purchase executed success"
        })
    }

    return (
        <>
            <Header />
            <section className="container mt-4">
                <Alert {...error} />
                { !isPurchased && !isExpired() &&
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
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        const ticket = await ticketService.getById(context.params.id, accessToken)
        const order = await orderService.create({ ticket: ticket._id }, accessToken)
        return {
            props: {
                ticket,
                order,
                accessToken
            }
        }
    })
}

export default TicketDetails;