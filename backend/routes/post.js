import { Router } from "express";
import {
  getAllPosts,
  getUserPosts,
  updateLikes,
  updatePosts,
} from "../controllers/post.js";
import { jwtCheck } from "../middleware/auth.js";

const router = new Router();

router.get("/", getAllPosts);
router.get("/:name", getUserPosts);
router.post("/", jwtCheck, updatePosts);
router.post("/like", jwtCheck, updateLikes);

export { router as post };
