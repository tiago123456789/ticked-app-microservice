import UserRepository from "../repositories/user";
import HashUtils from "../utils/hash";
import TokenUtils from "../utils/token";
import UserService from "./user"

jest.mock("../utils/hash");
jest.mock("../utils/token");
jest.mock("../repositories/user")

describe("Unit tests UserService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should be create user", async () => {
        const fakeReturn = {
            name: "test",
            email: "test@gmail.com",
            password: "123456"
        }

        const fakePasswordHash = "fadfjaksflgskfjkgsjakflglfg"
        const HashUtilsMocked = <jest.Mock<HashUtils>>HashUtils;
        const hashUtilMocked = <jest.Mocked<HashUtils>>new HashUtilsMocked();

        const TokenUtilsMocked = <jest.Mock<TokenUtils>>TokenUtils;
        const tokenUtilMocked = <jest.Mocked<TokenUtils>>new TokenUtilsMocked();

        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked()

        userRepositoryMocked.findByEmail.mockResolvedValue(null)
        userRepositoryMocked.create.mockResolvedValue([
            {
                name: fakeReturn.name,
                email: fakeReturn.email,
                password: fakePasswordHash
            }
        ])
        hashUtilMocked.getHash.mockResolvedValue(fakePasswordHash)
        const userService = new UserService(hashUtilMocked, tokenUtilMocked, userRepositoryMocked)
        const userCreated = await userService.create(fakeReturn)
        expect(fakeReturn.email).toBe(userCreated[0].email)
        expect(fakeReturn.name).toBe(userCreated[0].name)
        expect(fakePasswordHash).toBe(userCreated[0].password)
    })

    it("Should be throw exception when try create user with email already used", async () => {
        try {
            const fakeReturn = {
                name: "test",
                email: "test@gmail.com",
                password: "123456"
            }
            const HashUtilsMocked = <jest.Mock<HashUtils>>HashUtils;
            const hashUtilMocked = <jest.Mocked<HashUtils>>new HashUtilsMocked();

            const TokenUtilsMocked = <jest.Mock<TokenUtils>>TokenUtils;
            const tokenUtilMocked = <jest.Mocked<TokenUtils>>new TokenUtilsMocked();

            const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
            const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked()

            userRepositoryMocked.findByEmail.mockResolvedValue(fakeReturn)
            const userService = new UserService(hashUtilMocked, tokenUtilMocked, userRepositoryMocked)
            await userService.create(fakeReturn)
        } catch (error: any) {
            expect("Try another email!").toBe(error.message)
        }
    })

    it("Should be throw exception when try authenticate user but email not exist", async () => {
        try {
            const fakeReturn = {
                name: "test",
                email: "test@gmail.com",
                password: "123456"
            }
            const HashUtilsMocked = <jest.Mock<HashUtils>>HashUtils;
            const hashUtilMocked = <jest.Mocked<HashUtils>>new HashUtilsMocked();

            const TokenUtilsMocked = <jest.Mock<TokenUtils>>TokenUtils;
            const tokenUtilMocked = <jest.Mocked<TokenUtils>>new TokenUtilsMocked();

            const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
            const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked()

            userRepositoryMocked.findByEmail.mockResolvedValue(null)
            const userService = new UserService(hashUtilMocked, tokenUtilMocked, userRepositoryMocked)
            await userService.authenticate(fakeReturn)
        } catch (error: any) {
            expect("Credentials invalid!").toBe(error.message)
        }
    })

    it("Should be throw exception when try authenticate user but email not exist", async () => {
        try {
            const fakeReturn = {
                name: "test",
                email: "test@gmail.com",
                password: "123456"
            }
            const HashUtilsMocked = <jest.Mock<HashUtils>>HashUtils;
            const hashUtilMocked = <jest.Mocked<HashUtils>>new HashUtilsMocked();

            const TokenUtilsMocked = <jest.Mock<TokenUtils>>TokenUtils;
            const tokenUtilMocked = <jest.Mocked<TokenUtils>>new TokenUtilsMocked();

            const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
            const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked()

            userRepositoryMocked.findByEmail.mockResolvedValue(fakeReturn)
            // @ts-ignore
            hashUtilMocked.compare.mockReturnValue(false)
            const userService = new UserService(hashUtilMocked, tokenUtilMocked, userRepositoryMocked)
            await userService.authenticate(fakeReturn)
        } catch (error: any) {
            expect("Credentials invalid!").toBe(error.message)
        }
    })

    it("Should be generate accessToken with success", async () => {
        const fakeReturn = {
            name: "test",
            email: "test@gmail.com",
            password: "123456"
        }
        const HashUtilsMocked = <jest.Mock<HashUtils>>HashUtils;
        const hashUtilMocked = <jest.Mocked<HashUtils>>new HashUtilsMocked();

        const TokenUtilsMocked = <jest.Mock<TokenUtils>>TokenUtils;
        const tokenUtilMocked = <jest.Mocked<TokenUtils>>new TokenUtilsMocked();

        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked()

        userRepositoryMocked.findByEmail.mockResolvedValue(fakeReturn)
        // @ts-ignore
        hashUtilMocked.compare.mockReturnValue(true)
        const userService = new UserService(hashUtilMocked, tokenUtilMocked, userRepositoryMocked)
        await userService.authenticate(fakeReturn)
        expect(tokenUtilMocked.get).toBeCalledTimes(1)
    })
})