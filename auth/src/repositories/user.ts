import User from "../models/user"

export default class UserRepository {

    findByEmail(email: string) {
        return User.findOne({ email })
    }
}