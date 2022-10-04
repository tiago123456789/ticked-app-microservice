import { useState } from "react"
import Link from "next/link"
import * as authService from "../services/auth"
import * as orderService from "../services/order"
import Header from "../components/Header";
import routes from "../constants/routes"

const Orders = ({ orders: orderReturned }) => {
    const [orders] = useState(orderReturned)

    const renderTickets = () => {
        return orders.map(item => {
            return (
                <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                </tr>
            );
        })
    }

    return <>
        <Header />
        <section className="container mt-4">
            <h2 className="text-center">My orders</h2>
            <table className="table table-boreded table-striped">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
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
        const orders = await orderService.getAllByUserAuthenticated(accessToken)
        return {
            props: {
                orders,
            },
        }
    })
}

export default Orders;