import mongoose from "mongoose";
const { Schema } = mongoose;

const mininstaUserSchema = new Schema(
  {
    name: String,
    picture: String,
    email: { type: String, required: true },
    posts: [
      {
        email: String,
        id: String,
        name: String,
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
