import express from "express";
const router = express.Router();
import user from "./user.js";
import blog from "./blog.js";

router.use("/user", user);

router.use("/blog", blog);

export default router;
