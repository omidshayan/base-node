import express from "express"
import dbConnect from "./config/db/dbConnect.js"
import dotenv from "dotenv"

dotenv.config()
dbConnect()
const app = express()




app.post('/omid', (req, res) =>{
    res.json('ok shod')
})
app.get("/salam" , (req, res) => {
    res.json('enam ok shod')
})
app.get("/" , (req, res) => {
    res.json('home page')
})



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in port: ${PORT}`))
