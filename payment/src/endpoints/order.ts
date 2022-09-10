import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order";
import OrderDto from "../dtos/order"
import * as yup from "yup"

class OrderEndpoint {

    constructor(
        private orderService: OrderService
    ) {
    }

}

export default OrderEndpoint;