import { Router } from "express";
import {
  loginUser,
  deleteUser,
  getSuggestions,
} from "../controllers/user.controller.js";
import { jwtCheck } from "../middleware/auth.js";

const router = new Router();

router.get("/", getSuggestions);
router.post("/", loginUser);
router.delete("/", jwtCheck, deleteUser);

export { router as user };
