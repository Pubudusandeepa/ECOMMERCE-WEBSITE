import express from 'express'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRouter from './router/userRouter'
import productRoute from './router/productRouter'
dotenv.config()
const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).catch(error => console.log(error.reson))

const app = express()
app.use(bodyParser.json())
app.use("/api/users", userRouter)
app.use("/api/products", productRoute)


app.listen(5000, () =>{console.log("server start at http://localhost:5000")} )