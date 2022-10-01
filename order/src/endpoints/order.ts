import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order";
import OrderDto from "../dtos/order"
import * as yup from "yup"

class OrderEndpoint {

    constructor(
        private orderService: OrderService
    ) {
        this.create = this.create.bind(this)
        this.findById = this.findById.bind(this)
        this.findAllByUserId = this.findAllByUserId.bind(this)
        this.cancel = this.cancel.bind(this)
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
            // @ts-ignore
            const orderCreated = await this.orderService.create(data, request.userId);
            return response.status(201).json(orderCreated);
        } catch(error) {
            return next(error);
        }
    }

    async cancel(request: Request, response: Response, next: NextFunction) {
        try {
                await this.orderService.cancel(
                // @ts-ignore
                request.params.id, request.userId
            );
            return response.sendStatus(204);
        } catch(error) {
            return next(error);
        }
    }


    async findAllByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const registers = await this.orderService.findAllByUserId(
                // @ts-ignore
                request.userId
            );
            return response.json(registers);
        } catch(error) {
            return next(error);
        }
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const order = await await this.orderService.findById(
                // @ts-ignore
                request.params.id, request.userId
            );
            return response.json(order);
        } catch(error) {
            return next(error);
        }
    }
}

export default OrderEndpoint;