import { Request, Response, NextFunction } from "express"

export const handleException = (error: Error, request: Request, response: Response, next: NextFunction) => {
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


    if (error.name === 'NotFoundException') {
        return response.status(404).json({ 
            statusCode: 404,
            // @ts-ignore
            error: [error.message]
        })
    }

    if (error.name === "BusinessLogicException") {
        return response.status(409).json({ 
            statusCode: 409,
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