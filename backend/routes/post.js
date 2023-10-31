import { Router } from "express";
import { getAllPosts, updateLikes, updatePosts } from "../controllers/post.js";
const router = new Router();
import { auth } from "express-oauth2-jwt-bearer";

router.get("/", async (req, res) => {
  const allPosts = await getAllPosts();
  res.json(allPosts);
});

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNIN_ALG,
});

router.post("/", async (req, res) => {
  const { email, post } = req.body;
  const response = await updatePosts(email, post);
  res.json(response);
});

router.post("/like", jwtCheck, async (req, res) => {
  const response = await updateLikes(
    req.body.postOwner,
    req.body.postId,
    req.body.email
  );
  res.json(response);
});

export { router as post };
