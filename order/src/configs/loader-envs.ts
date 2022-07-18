import { config } from "dotenv";

if (process.env.NODE_ENV == "testing") {
    config({ path: ".env.testing" })
} else {
    config({ path: ".env" })
}