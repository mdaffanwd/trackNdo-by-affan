import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'


import connectDB from './config/db.config.js';
import boardRoutes from './routes/board.routes.js';
import taskRoutes from './routes/task.routes.js';
import googleAuthRoutes from './routes/googleAuth.routes.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

connectDB()


app.use("/api/boards", boardRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/google-auth", googleAuthRoutes)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});