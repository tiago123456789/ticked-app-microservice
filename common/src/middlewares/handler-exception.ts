import { Request, Response, NextFunction } from "express"

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ 
            statusCode: 400,
            // @ts-ignore
            error: error.errors 
        })
    }

    if (error.name === 'InvalidDataException') {
        return response.status(400).json({ 
            statusCode: 400,
            // @ts-ignore
            error: [error.message]
        })
    }

    console.log(error)
    response.status(500).json({ 
        statusCode: 500,
        error: "Internal server error"
    })
}