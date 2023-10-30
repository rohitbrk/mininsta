import { Router } from "express";
const router = new Router();

router.get("/user", async (req, res) => {
  res.json({ status: "ok" });
});

export { router };
