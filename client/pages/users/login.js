import React, { useState } from "react"
import Router from "next/router"
import Alert from "../../components/Alert"
import { useAuth } from "../../hooks/useAuth";
import { ALERT_ERROR, ALERT_SUCCESS } from "../../constants/alert";
import routes from "../../constants/routes"

const Login = () => {
    const { authenticate } = useAuth();
    const [alert, setAlert] = useState({
        message: null,
        type: ALERT_ERROR
    });
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const onChange = (key, value) => {
        setCredentials({
            ...credentials,
            [key]: value
        })
    }

    const save = async (event) => {
        event.preventDefault();
        try {
            await authenticate(credentials)
            setAlert({
                message: "Sign in success",
                type: ALERT_SUCCESS
            })
            Router.push("/")
        } catch(error) {
            setAlert({
                message: error.message,
                type: ALERT_ERROR
            })
        }

    }

    return (
        <div className="container mt-5">
            { 
                alert.message && <Alert {...alert} />
            }
            <form className="form-signin col-md-7 offset-md-3">
                <h1 className="h3 mb-3 font-weight-normal text-center">Sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email:</label>
                <input type="email" id="inputEmail" 
                onChange={(event) => onChange("email", event.target.value)}
                value={credentials.email}
                className="form-control" placeholder="Email address" required autofocus />
                <label htmlFor="inputPassword" className="sr-only">Password:</label>
                <input type="password" 
                 onChange={(event) => onChange("password", event.target.value)}
                 value={credentials.password}
                id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="btn btn-primary btn-block mt-2"
                onClick={save}
                type="submit">Sign in</button>&nbsp;
                 <button className="btn btn-primary btn-block mt-2"
                onClick={() => Router.push(routes.REGISTER)}
                type="submit">Register</button>
            </form>

        </div>
    )
}

export default Login;