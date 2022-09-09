import { NextFunction, Request, Response } from "express";
import TicketService from "../service/ticket"
import * as yup from "yup"

export default class TicketEndpoint {

    constructor(
        private readonly ticketService: TicketService,
    ) {
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const tickets = await this.ticketService.findAll();
            response.json(tickets);
        } catch(error) {
            next(error);
        }
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const ticket = await this.ticketService.findById(request.params.id);
            response.json(ticket);
        } catch(error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            let schema = yup.object().shape({
                title: yup.string().min(1).required(),
                price: yup.number().required()
            });

            await schema.validate(request.body);
            // @ts-ignore
            request.body.userId = request.userId;
            await this.ticketService.create(request.body);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            await this.ticketService.update(request.params.id, request.body);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }
}