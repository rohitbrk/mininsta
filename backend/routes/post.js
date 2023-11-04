import { Router } from "express";
import { getAllPosts, updateLikes, updatePosts } from "../controllers/post.js";
const router = new Router();
import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNIN_ALG,
});

router.get("/", getAllPosts);
router.post("/", jwtCheck, updatePosts);
router.post("/like", jwtCheck, updateLikes);

export { router as post };
