import { connect } from 'mongoose'

export default async function connectDB() {
  try {
    const connection = await connect(process.env.MONGO_URI)
    // console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    // console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
}