import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import * as authService from "../services/auth"
import Header from "../components/Header"

const App = ({ Component, pageProps }) => {
    const [isAuthenticated, _] = useState(authService.isAuthenticated())

    return (
        <>
         <Header />   
         <Component {...pageProps} />
        </>
    )
}

export default App;