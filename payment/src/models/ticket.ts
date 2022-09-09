import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    ticketId: { type: String, required: true }
})

export default mongoose.model("tickets", ticketSchema)