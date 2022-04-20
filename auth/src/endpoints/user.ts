import { NextFunction, Request, Response } from "express";
import UserService from "../service/user"
import * as yup from "yup"
import CookieUtils from "../utils/cookie";
import TokenUtils from "../utils/token";

export default class UserEndpoint {

    constructor(
        private readonly userService: UserService,
        private readonly cookieUtil: CookieUtils,
        private readonly tokenUtil: TokenUtils
    ) {
        this.register = this.register.bind(this);   
        this.authenticate = this.authenticate.bind(this);
        this.currentUser = this.currentUser.bind(this);
    }

    async currentUser(request: Request, response: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const accessToken = this.cookieUtil.getValueByKey("accessToken", request.headers.cookie)
            // @ts-ignore
            const payload = this.tokenUtil.decode(accessToken);
            const id = payload["id"]
            const user = await this.userService.findById(id);
            response.status(200).json(user)
        } catch(error) {
            next(error);
        }
    }

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
            response.cookie('accessToken', accessToken)
            response.json({ accessToken });
        } catch(error) {
            next(error);
        }
    }
}