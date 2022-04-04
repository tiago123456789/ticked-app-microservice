import Credential from "../dtos/credential";
import User from "../dtos/user";
import InvalidDataException from "../exceptions/invalid-data-exception";
import user from "../models/user";
import UserRepository from "../repositories/user";
import HashUtils from "../utils/hash"
import TokenUtils from "../utils/token";

export default class UserService {

    constructor(
        private readonly hash: HashUtils,
        private readonly token: TokenUtils,
        private readonly userRepository: UserRepository
    ) {}

    async create(user: User) {
        const register = await this.userRepository.findByEmail(user.email);
        if (register) {
            throw new InvalidDataException("Try another email!")
        }

        user.password = await this.hash.getHash(user.password);
        return this.userRepository.create(user);
    }

    async authenticate(credential: Credential): Promise<string> {
        const register = await this.userRepository.findByEmail(credential.email);
        if (!register) {
            throw new InvalidDataException("Credentials invalid!")
        }

        const isValidPassword = this.hash.compare(credential.password, register.password)
        if (!isValidPassword) {
            throw new InvalidDataException("Credentials invalid!")
        }

        const accessToken = this.token.get({
            // @ts-ignore
            id: user._id,
            // @ts-ignore
            email: user.email
        })

        return accessToken
    }
}