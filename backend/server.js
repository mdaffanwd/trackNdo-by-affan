import express from 'express'
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
app.use(cors())

import connectDB from './config/db.config.js';
import boardRoutes from './routes/board.routes.js';

connectDB()

app.use(express.json());


app.get('/', (req, res) => {
  res.send("hi")
})

app.use("/api/boards", boardRoutes)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});