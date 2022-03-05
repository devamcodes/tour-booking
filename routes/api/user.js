import express from "express";
import {
	checkUsers,
	createUser,
	getParticularUserId,
	updatePassword,
} from "../../controllers/user.js";

const router = express.Router();

router.post("/login", checkUsers);
router.post("/new-user", createUser);
router.post("/check-user", getParticularUserId);
router.put("/:id", updatePassword);

export default router;
