import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import { user } from "./routes/user.route.js";
import { post } from "./routes/post.route.js";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectDb();

app.use("/user", user);
app.use("/post", post);

app.get("/", (req, res) => {
  res.json({ status: "ok", msg: "hey !" });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
