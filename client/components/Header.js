import React from "react"
import * as authService from "../services/auth"

export default ({ isAuthenticated }) => {

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
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    { isAuthenticated && 
                        <li className="nav-item right">
                            <a className="nav-link" onClick={() => logout()}>Logout</a>
                        </li>
                    }
                    
                </ul>
            </div>
        </nav>
    )
}