import User from "../models/user"
import UserDto from "../dtos/user";

export default class UserRepository {

    findByEmail(email: string) {
        return User.findOne({ email })
    }

    create(user: UserDto) {
        return User.insertMany([
            user
        ])
    }
}