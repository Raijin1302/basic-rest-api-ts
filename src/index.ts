import express from "express"
require("dotenv").config()
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
const app = express()

app.use(
  cors({
    credentials: true,
  })
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)
const port = process.env.PORT || 5000
const connectDB = require("./db/connect")
mongoose.Promise = Promise

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL)
    //mongoose.connect(process.env.DATABASE_URL)
    server.listen(port, () => {
      console.log(`Server is running on ${port}`)
    })
  } catch (error) {
    mongoose.connection.on("error", (error: Error) => console.log(error))
  }
}
start()
