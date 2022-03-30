import Credential from "../dtos/credential";
import InvalidDataException from "../exceptions/invalid-data-exception";
import UserRepository from "../repositories/user";
import HashUtils from "../utils/hash"

class UserService {

    constructor(
        private readonly hash: HashUtils,
        private readonly userRepository: UserRepository
    ) {}

    async authenticate(credential: Credential) {
        const register = await this.userRepository.findByEmail(credential.email);
        if (!register) {
            throw new InvalidDataException("Credentials invalid!")
        }

        const isValidPassword = this.hash.compare(credential.password, register.password)
        if (!isValidPassword) {
            throw new InvalidDataException("Credentials invalid!")
        }

        
    }
}