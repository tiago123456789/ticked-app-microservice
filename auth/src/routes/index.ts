import { Express, Request, Response, NextFunction } from "express"
import * as yup from "yup"
import UserEndpoint from "../endpoints/user";
import UserEndpointFactory from "../factories/user-endpoint-factory"

const userEndpointFactory: UserEndpoint = new UserEndpointFactory().make({});
export default (app: Express) => {

    app.get("/api/users/signout", (request: Request, response: Response) => {
        response.json({
            message: "Me here 2 "
        })
    })

    app.get("/api/users/me", userEndpointFactory.currentUser)

    app.post("/api/users/signup", userEndpointFactory.register)

    app.post("/api/users/signin", userEndpointFactory.authenticate)
}