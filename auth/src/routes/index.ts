import { Express, Request, Response, NextFunction } from "express"
import * as yup from "yup"

export default (app: Express) => {

    app.get("/api/users/signout", (request: Request, response: Response) => {
        response.json({
            message: "Me here 2 "
        })
    })

    app.post("/api/users/signup", async (request: Request, response: Response, next: NextFunction) => {
        try {
            let schema = yup.object().shape({
                name: yup.string().min(1).required(),
                email: yup.string().email().required(),
                password: yup.string().min(6).max(20),
            });

            await schema.validate(request.body)

            response.json({
                message: "Me here 2 "
            })
        } catch (error: any) {
            next(error);
        }

    })

    app.post("/api/users/signin", async (request: Request, response: Response, next: NextFunction) => {
        try {
            let schema = yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().min(6).max(20),
            });

            await schema.validate(request.body)

            response.json({
                message: "Route signin"
            })
        } catch (error: any) {
            next(error)
        }
    })
}