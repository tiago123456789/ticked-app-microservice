import jwt from "jsonwebtoken"

export class TokenUtils {

    get(payload: { [key: string]: any }) {
        // @ts-ignore
        return jwt.sign(payload, process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRATION }
        );
    }

    decode(token: string) {
        // @ts-ignore
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}