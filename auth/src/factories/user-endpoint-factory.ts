import UserEndpoint from "../endpoints/user";
import CookieUtils from "../utils/cookie";
import TokenUtils from "../utils/token";
import { FactoryInterface } from "./factory-interface";
import { UserServiceFactory } from "./user-service-factory";

export default class UserEndpointFactory implements FactoryInterface<UserEndpoint> {

    make(data: { [key: string]: any; }): UserEndpoint {
        return new UserEndpoint(
            new UserServiceFactory().make({}),
            new CookieUtils(),
            new TokenUtils()
        )
    }


}