import express from "express";
import { createBlog, getBlog } from "../../controllers/blog.js";

const router = express.Router();

router.post("/new-blog", createBlog);
router.get("/blogs", getBlog);

export default router;
