import React from "react"
import * as authService from "../services/auth"
import Link from "next/link"
import routes from "../constants/routes"

export default () => {

    const logout = () => {
        authService.logout();
        window.location.href = "/users/login"
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Gitix</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link href={routes.TICKETS}>
                            <a className="nav-link" href="#">Tickets</a>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link href={routes.SELL_TICKET}>
                            <a className="nav-link" href="#">Sell tickets</a>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link href={routes.MY_ORDERS}>
                            <a className="nav-link" href="#">My orders</a>
                        </Link>
                    </li>
                    <li className="nav-item right">
                        <a className="nav-link" onClick={() => logout()}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav >
    )
}