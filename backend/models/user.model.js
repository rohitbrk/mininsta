import mongoose from "mongoose";
const { Schema } = mongoose;

const mininstaUserSchema = new Schema(
  {
    name: String,
    userId: String,
    picture: String,
    name: { type: String, required: true },
    posts: [
      {
        id: String,
        name: String,
        userId: String,
        picture: String,
        title: String,
        desc: String,
        date: String,
        img: String,
        likes: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MininstaUser", mininstaUserSchema);
