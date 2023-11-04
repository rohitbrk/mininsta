import { Router } from "express";
import { LoginUser, deleteUser } from "../controllers/user.js";
const router = new Router();

router.post("/", LoginUser);
router.delete("/", deleteUser);

export { router as user };
