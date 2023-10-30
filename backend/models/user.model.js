import mongoose from "mongoose";
const { Schema } = mongoose;

const mininstaUserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true },
    posts: [{ title: String, desc: String, img: String, likes: Number }],
  },
  { timestamps: true }
);

export default mongoose.model("MininstaUser", mininstaUserSchema);
