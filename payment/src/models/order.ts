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
    },
    price: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true
    }
})

export default mongoose.model("orders", orderSchema)

