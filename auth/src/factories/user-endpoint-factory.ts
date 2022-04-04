import UserEndpoint from "../endpoints/user";
import { FactoryInterface } from "./factory-interface";
import { UserServiceFactory } from "./user-service-factory";

export default class UserEndpointFactory implements FactoryInterface<UserEndpoint> {

    make(data: { [key: string]: any; }): UserEndpoint {
        return new UserEndpoint(
            new UserServiceFactory().make({})
        )
    }


}