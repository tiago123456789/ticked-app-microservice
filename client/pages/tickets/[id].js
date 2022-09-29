import Header from "../../components/Header"
import * as authService from "../../services/auth"
import * as ticketService from "../../services/ticket"

const TicketDetails = ({ ticket }) => {
    return (
        <>
            <Header />
            <section className="container mt-4">
                Ticket details page
                {JSON.stringify(ticket)}
            </section>
        </> 
    )
}

export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        const ticket = await ticketService.getById(context.params.id, accessToken)
        return {
            props: {
                ticket
            }
        } 
    })
}

export default TicketDetails;