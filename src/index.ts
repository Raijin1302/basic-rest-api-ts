import express from "express"
require("dotenv").config()
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"

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

const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is running on ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
