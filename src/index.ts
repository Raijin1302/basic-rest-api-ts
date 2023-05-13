import express from "express"
require("dotenv").config()
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"

import router from "./router"
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
// const connectDB = require("./db/connect")
server.listen(port, () => {
  console.log(`Server is running on ${port}`)
})

mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE_UR)
mongoose.connection.on("error", (error: Error) => console.log(error))
app.use("/", router())
// const start = async () => {
//   try {
//     await connectDB(process.env.DATABASE_URL)
//     //mongoose.connect(process.env.DATABASE_URL)
//     server.listen(port, () => {
//       console.log(`Server is running on ${port}`)
//     })
//   } catch (error) {
//     mongoose.connection.on("error", (error: Error) => console.log(error))
//   }
// }
// start()
