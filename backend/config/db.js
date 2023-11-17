import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const disconnectDb = async () => {
  await mongoose.connection.close();
};

export { connectDb, disconnectDb };
