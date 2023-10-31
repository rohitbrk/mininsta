import mongoose from "mongoose";
const { Schema } = mongoose;

const mininstaUserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true },
    posts: [
      {
        email: String,
        id: String,
        name: String,
        title: String,
        desc: String,
        img: String,
        likes: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MininstaUser", mininstaUserSchema);
