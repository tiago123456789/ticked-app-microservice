import OrderService from "../service/order";
import * as yup from "yup"
import { NextFunction, Request, Response } from "express";

class ChargeEndpoint {

    constructor(
        private orderService: OrderService
    ) {
        this.charge = this.charge.bind(this)
    }

    async charge(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;
            let schema = yup.object().shape({
                orderId: yup.string().required(),
                token: yup.string().required(),
            });

            await schema.validate(request.body);
            await this.orderService.charge(body)
            return response.sendStatus(201)
        } catch(error) {
            return next(error);
        }
    }

}

export default ChargeEndpoint;