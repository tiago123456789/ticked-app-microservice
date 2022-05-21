import bcrypt from "bcryptjs"

export class HashUtils {

    async getHash(value: string) {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(value, salt);
    }

    async compare(value: string, hash: string) {
        return bcrypt.compare(value, hash);
    }
}