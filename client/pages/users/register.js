import React, { useState } from "react"
import Alert from "../../components/Alert"
import * as authService from "../../services/auth"

const ALERT_ERROR = "alert-danger"
const ALERT_SUCCESS = "alert-success"

const Register = () => {
    const [alert, setAlert] = useState({
        message: null,
        type: ALERT_ERROR
    });
    const [credentials, setCredentials] = useState({
        name: "",
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
            await authService.register(credentials)
            setAlert({
                message: "Sign up success",
                type: ALERT_SUCCESS
            })
            setCredentials({
                name: "", email: "", password: ""
            })
        } catch(error) {
            setAlert({
                message: error.response.data.error,
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
                <h1 className="h3 mb-3 font-weight-normal text-center">Sign up</h1>
                <label htmlFor="name" className="sr-only">Name:</label>
                <input type="text" id="name" 
                onChange={(event) => onChange("name", event.target.value)}
                value={credentials.name}
                className="form-control" required autofocus />
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
                type="submit">Sign up</button>
            </form>

        </div>
    )
}

export default Register;