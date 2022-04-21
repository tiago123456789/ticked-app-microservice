import { Request, Response, NextFunction } from "express"
import CookieUtils from "../utils/cookie"
import TokenUtils from "../utils/token"


const cookieUtils = new CookieUtils();
const tokenUtils = new TokenUtils();

export default (request: Request, response: Response, next: NextFunction) => {
    // @ts-ignore
    let accessToken: string | null = cookieUtils.getValueByKey("accessToken", request.headers.cookie)
    // @ts-ignore
    accessToken = accessToken || request.headers.authorization;

    if (!accessToken)  {
        return response.status(401).json({
            statusCode: 401,
            error: "You need informate accessToken"
        })
    }

    // @ts-ignore
    accessToken = accessToken?.replace("Bearer ", "")

    try {
        // @ts-ignore
        const isValid = tokenUtils.decode(accessToken)
        if (!isValid) {
            return response.status(403).json({
                statusCode: 403,
                error: "Your accessToken informated is invalid or expired"
            })
        }
        return next();
    } catch(error) {
        response.status(403).json({
            statusCode: 403,
            error: "Your accessToken informated is invalid or expired"
        })
    }
}