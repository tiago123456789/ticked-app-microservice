import { Express } from "express"
import UserEndpoint from "../endpoints/user";
import UserEndpointFactory from "../factories/user-endpoint-factory"
import { authorizator } from "@ticket-app/common"

const userEndpointFactory: UserEndpoint = new UserEndpointFactory().make({});
export default (app: Express) => {

    app.get("/api/users/signout", authorizator, userEndpointFactory.logout)
    app.get("/api/users/me", authorizator, userEndpointFactory.currentUser)
    app.post("/api/users/signup", userEndpointFactory.register)
    app.post("/api/users/signin", userEndpointFactory.authenticate)
}