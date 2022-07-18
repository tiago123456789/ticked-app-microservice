import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true }
})

export default mongoose.model("tickets", userSchema)