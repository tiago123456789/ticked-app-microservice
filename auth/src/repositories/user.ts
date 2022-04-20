import User from "../models/user"
import UserDto from "../dtos/user";

export default class UserRepository {

    findById(id: string) {
        return User.findById(id, { password: 0, __v: 0 })
    }

    findByEmail(email: string) {
        return User.findOne({ email })
    }

    create(user: UserDto) {
        return User.insertMany([
            user
        ])
    }
}