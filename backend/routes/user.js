import express from "express";
import { checkUsers, createUser, getParticularUser, updatePassword } from "../controllers/user.js";

const router = express.Router();

router.post("/", checkUsers);
router.post("/new-user", createUser);
router.post("/check-user", getParticularUser);
router.put("/:id", updatePassword);

export default router;
