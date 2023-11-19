import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err.message);
  }
};

const disconnectDb = async () => {
  try {
    const response = await mongoose.connection.close();
  } catch (err) {
    console.log(err.message);
  }
};

export { connectDb, disconnectDb };
