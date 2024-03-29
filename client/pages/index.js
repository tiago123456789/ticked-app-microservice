import React from "react"
import * as authService from "../services/auth"
import Header from "../components/Header"

const Index = ({ user }) => {

    return <>
        <Header/>   
        <section className="container mt-4">
            <p className="text-center">Welcome the application {user.email}</p>
        </section>
    </>
}

export async function getServerSideProps(context) {
    const cookies = (context.req.cookies)
    const accessToken = cookies["accessToken"]
    return authService.hasAuthenticated(accessToken, async (accessToken) => {
        const user = await authService.getAuthenticatedUser(accessToken)
        return {
            props: {
                user,
            }
        } 
    })
}

export default Index;   