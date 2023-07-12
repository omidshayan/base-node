import express from "express"
import dbConnect from "./config/db/dbConnect.js"
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import { errorHandler } from "./middleware/error/errorHandler.js"
import cookieParser from 'cookie-parser'
dotenv.config()
dbConnect()
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use(userRoute)


app.post('/', (req,res) => {
    res.json('hi omid')
})


// error handler
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in port: ${PORT}`))
