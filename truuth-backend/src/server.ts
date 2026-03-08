import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes"
import documentRoutes from "./routes/documentRoutes"
import { startVerificationWorker } from "./services/verificationWorker"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// app.use("/uploads", express.static("uploads"))

app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

  // start polling worker
  startVerificationWorker()

})