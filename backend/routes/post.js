import { Router } from "express";
import { getAllPosts } from "../controllers/post.js";
const router = new Router();

router.get("/", async (req, res) => {
  const allPosts = await getAllPosts();
  res.json(allPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  console.log(post.email, post.name);
  res.json({ email: post.email, name: post.name });
});

export { router as post };
