import mongoose from "mongoose"

const chargeSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true
    }
})

export default mongoose.model("charges", chargeSchema)

