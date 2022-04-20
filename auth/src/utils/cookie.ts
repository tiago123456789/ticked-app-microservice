import * as cookie from "cookie"

export default class CookieUtils {


    getValueByKey(key: string, cookies: string): string | null {
        // @ts-ignore
        return cookie.parse(cookies)[key] || null;
    }   
}