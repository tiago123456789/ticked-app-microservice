import { useState } from "react"
import * as authService from "../../services/auth"
import Header from "../../components/Header";
import Alert from "../../components/Alert"
import * as ticketService from "../../services/ticket"
import { ALERT_ERROR, ALERT_SUCCESS } from "../../constants/alert";
import { useAuth } from "../../hooks/useAuth";

const Ticket = () => {
    const { getAccessToken } = useAuth()
    const [error, setError] = useState({})
    const [ticket, setTicket] = useState({})

    const onChangeInputValue = (key, value) => {
        setTicket({ ...ticket, [key]: value })
    }

    const submit = async (event) => {
        try {
            event.preventDefault()
            await ticketService.create(getAccessToken(), ticket)
            setError({
                type: ALERT_SUCCESS,
                message: "Ticket create success"
            })
            setTicket({ title: "", price: "" })
        } catch(error) {
            setError({
                type: ALERT_ERROR,
                message: error.message
            })
        }
        
    }

    return <>
        <Header />
        <section className="container mt-4">
            <Alert {...error} />
            <h2 className="text-center">New Tickets</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Title:</label>
                    <input
                    value={ticket.title}
                    onChange={(event) => onChangeInputValue("title", event.target.value)}
                    type="text" name="title" className="form-control" />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                    value={ticket.price}
                    onChange={(event) => onChangeInputValue("price", event.target.value)}
                    type="text" name="price" className="form-control" />
                </div>
                <div>
                    <button className="btn btn-primary mt-1">Create</button>
                </div>
            </form>
        </section>
    </>
}


export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        return {
            props: {}
        }
    })
}

export default Ticket;