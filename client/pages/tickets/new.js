import { useState } from "react"
import * as authService from "../../services/auth"
import Header from "../../components/Header";

const Ticket = () => {
    const [ticket, setTicket] = useState({})

    const onChangeInputValue = (key, value) => {
        setTicket({ ...ticket, [key]: value })
    }

    const submit = (event) => {
        event.preventDefault()
        console.log(ticket)
    }

    return <>
        <Header />
        <section className="container mt-4">
            <h2 className="text-center">New Tickets</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Title:</label>
                    <input onChange={(event) => onChangeInputValue("title", event.target.value)}
                    type="text" name="title" className="form-control" />
                </div>
                <div>
                    <label>Price:</label>
                    <input
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