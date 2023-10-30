import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import { getAllPosts } from "./controllers/post.js";
import { auth } from "express-oauth2-jwt-bearer";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNIN_ALG,
});

app.get("/", (req, res) => {
  res.json({ status: "ok", msg: "hey !" });
});

app.get("/protected", jwtCheck, (req, res) => {
  res.json({ status: "ok", msg: "hey from protected route" });
});

// user
app.get("/user", async (req, res) => {
  res.json({ status: "ok" });
});

// post
app.get("/post", async (req, res) => {
  const allPosts = await getAllPosts();
  res.json(allPosts);
});

app.post("/post", async (req, res) => {});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
