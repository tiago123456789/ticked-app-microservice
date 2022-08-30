import { OrderStatus } from "@ticket-app/common/build"
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.CREATED,
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
    },
})

export default mongoose.model("orders", orderSchema)

