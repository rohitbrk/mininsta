import { Router } from "express";
const router = new Router();

router.get("/", async (req, res) => {
  res.json({ status: "ok" });
});

export { router as user };
