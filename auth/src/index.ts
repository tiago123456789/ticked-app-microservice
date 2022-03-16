import express, { Response, Request } from "express"
import * as yup from "yup"

const app = express();

app.use(express.json())

app.get("/api/users/signout", (request: Request, response: Response) => {
    response.json({
        message: "Me here 2 "
    })
})

app.post("/api/users/signup", async (request: Request, response: Response) => {
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
    } catch(error: any) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ 
                statusCode: 400,
                error: error.errors 
            })
        }

        response.status(500).json({ 
            statusCode: 500,
            error: "Internal server error"
        })
    }
    
})

app.post("/api/users/signin", async (request: Request, response: Response) => {
    try {
        let schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(6).max(20),
        });
    
        await schema.validate(request.body)

        response.json({
            message: "Route signin"
        })
    } catch(error: any) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ 
                statusCode: 400,
                error: error.errors 
            })
        }

        response.status(500).json({ 
            statusCode: 500,
            error: "Internal server error"
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running port 3000")
})