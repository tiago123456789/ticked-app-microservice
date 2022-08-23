import mongoose from "mongoose"
mongoose.Promise = Promise

// @ts-ignore
mongoose.connect(process.env.DB_URL)