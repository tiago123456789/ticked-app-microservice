import UserRepository from "../repositories/user";
import UserService from "../service/user";
import HashUtils from "../utils/hash";
import TokenUtils from "../utils/token";
import { FactoryInterface } from "./factory-interface";


export class UserServiceFactory implements FactoryInterface<UserService> {

    make(data: { [key: string]: any; }): UserService {
        return new UserService(
            new HashUtils(),
            new TokenUtils(),
            new UserRepository()
        )
    }


}