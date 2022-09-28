import { useState } from "react"
import * as authService from "../../services/auth"
import * as ticketService from "../../services/ticket"
import Header from "../../components/Header";

const Ticket = ({ tickets: ticketsReturned }) => {
    const [tickets] = useState(ticketsReturned)

    const renderTickets = () => {
        return tickets.map(item => {
            return (
                <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                        {item.is_lock == false &&
                            <button className="btn btn-primary">Purchase</button>
                        }

                    </td>
                </tr>
            );
        })
    }

    return <>
        <Header />
        <section className="container mt-4">
            <h2 className="text-center">Tickets</h2>
            <table className="table table-boreded table-striped">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTickets()}                
                </tbody>
            </table>
        </section>
    </>
}


export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        const tickets = await ticketService.getTickets(accessToken)
        return {
            props: {
                tickets,
            },
        }
    })
}

export default Ticket;