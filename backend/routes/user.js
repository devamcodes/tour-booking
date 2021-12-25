import express from "express";
import { getUsers, createUser } from "../controllers/user";

const router = express.Router();

router.get("/", getUsers);
router.post("/new-user", createUser);

export default router;
