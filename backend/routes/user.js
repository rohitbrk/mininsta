import { Router } from "express";
import { createUser, deleteUser } from "../controllers/user.js";
const router = new Router();

router.get("/", async (req, res) => {
  res.json({ status: "ok" });
});

router.post("/", async (req, res) => {
  const { given_name, email } = req.body;
  const user = await createUser(given_name, email);
  res.json(user);
});

router.delete("/", async (req, res) => {
  const email = req.query.email;
  const response = await deleteUser(email);
  res.json({ status: "ok", response });
});

export { router as user };
