import { Router } from "express";
import { getAllPosts } from "../controllers/post.js";
const router = new Router();

router.get("/post", async (req, res) => {
  const allPosts = await getAllPosts();
  res.json(allPosts);
});

router.post("/post", async (req, res) => {});

export { router };
