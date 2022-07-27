import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order";
import OrderDto from "../dtos/order"
import * as yup from "yup"

class OrderEndpoint {

    private orderService: OrderService;

    constructor(
        orderService = new OrderService()
    ) {
        this.orderService = orderService;
        this.create = this.create.bind(this)
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const data: OrderDto = request.body;
            // @ts-ignore
            data.userId = request.userId;
            let schema = yup.object().shape({
                userId: yup.string().required(),
                ticket: yup.string().required(),
            });

            await schema.validate(data);
            await this.orderService.create(data);
            return response.sendStatus(201);
        } catch(error) {
            return next(error);
        }
    }
}

export default OrderEndpoint;