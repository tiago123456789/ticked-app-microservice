import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order";
import OrderDto from "../dtos/order"
import * as yup from "yup"

class OrderEndpoint {

    constructor(
        private orderService: OrderService
    ) {
    }

    charge(request, response, next) {
        try {

            this.orderService.charge()
            return response.sendStatus(201)
        } catch(error) {
            return next(error);
        }
    }

}

export default OrderEndpoint;