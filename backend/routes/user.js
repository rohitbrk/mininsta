import { Router } from "express";
import { loginUser, deleteUser } from "../controllers/user.js";
import { jwtCheck } from "../middleware/auth.js";

const router = new Router();

router.post("/", loginUser);
router.delete("/", jwtCheck, deleteUser);

export { router as user };
