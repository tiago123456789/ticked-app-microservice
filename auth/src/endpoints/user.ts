import { NextFunction, Request, Response } from "express";
import UserService from "../service/user"
import * as yup from "yup"

export default class UserEndpoint {

    constructor(
        private readonly userService: UserService
    ) {}

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            let schema = yup.object().shape({
                name: yup.string().min(1).required(),
                email: yup.string().email().required(),
                password: yup.string().min(6).max(20),
            });

            await schema.validate(request.body);
            await this.userService.create(request.body);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }
    
    async authenticate(request: Request, response: Response, next: NextFunction) {
        try {
            let schema = yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().min(6).max(20),
            });

            await schema.validate(request.body);
            const accessToken = await this.userService.authenticate(request.body);
            response.json({ accessToken });
        } catch(error) {
            next(error);
        }
    }
}