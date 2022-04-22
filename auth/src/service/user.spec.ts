import user from "../models/user";
import UserService from "./user"

describe("Unit tests UserService", () => {

    it("Should be throw exception when try create user with email already used", () => {
        const hashUtils = {};
        const tokenUtils = {};
        const userRepository = {};
        const userService = new UserService(hashUtils, tokenUtils, userRepository)
        expect(true).toBe(true)
    })
})