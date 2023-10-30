import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import { user } from "./routes/user.js";
import { post } from "./routes/post.js";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectDb();

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNIN_ALG,
});

app.use("/user", user);
app.use("/post", post);

app.get("/", (req, res) => {
  res.json({ status: "ok", msg: "hey !" });
});

app.get("/protected", jwtCheck, (req, res) => {
  res.json({ status: "ok", msg: "hey from protected route" });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
