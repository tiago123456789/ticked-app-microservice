import app from "./configs/server"

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`)
})