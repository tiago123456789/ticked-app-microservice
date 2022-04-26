import app from '../configs/server'
import request from "supertest"
import userModel from '../models/user'
import UserService from '../service/user'
import { UserServiceFactory } from '../factories/user-service-factory'

describe("Integration tests /users", () => {

    beforeEach(async () => {
        await userModel.deleteMany({})
    })

    it("POST /users/me status 200", async () => {
        const fakeData = {
            name: "test",
            email: "test@gmail.com",
            password: "123456789"
        }
        const userService: UserService = new UserServiceFactory().make({});
        await userService.create(fakeData);
        const accessToken = userService.authenticate(fakeData)
        request(app)
            .get("/users/me")
            .set({
                "Authorization": `Bearer ${accessToken}`
            })
            .expect(200)
    })


    it("POST /users/signin status 400", () => {
        request(app)
            .post("/users/signin")
            .send({})
            .expect(400)
    })


    it("POST /users/signin status 400 when credentials invalid", async () => {
        const fakeData = {
            name: "test",
            email: "test@gmail.com",
            password: "123456789"
        }
        await new UserServiceFactory().make({}).create(fakeData);
        request(app)
            .post("/users/signin")
            .send({
                ...fakeData,
                password: "123456"
            })
            .expect(400)
    })


    it("POST /users/signin status 200", async () => {
        const fakeData = {
            name: "test",
            email: "test@gmail.com",
            password: "123456789"
        }
        await new UserServiceFactory().make({}).create(fakeData);
        request(app)
            .post("/users/signin")
            .send(fakeData)
            .expect(200)
    })

    it("POST /users/signup status 400", () => {
        request(app)
            .post("/users/signup")
            .send({})
            .expect(400)
    })


    it("POST /users/signup status 400 when try create user with email already used", async () => {
        const fakeData = {
            name: "test",
            email: "test@gmail.com",
            password: "123456789"
        }
        await userModel.insertMany([
            fakeData
        ])
        request(app)
            .post("/users/signup")
            .send({})
            .expect(400)
    })

    it("POST /users/signup status 201", async () => {
        const fakeData = {
            name: "test",
            email: "test@gmail.com",
            password: "123456789"
        }
        request(app)
            .post("/users/signup")
            .send(fakeData)
            .expect(201)
    })
})