import express from "express";
import { createOrEditBlog, deleteBlog, getBlog } from "../../controllers/blog.js";

const router = express.Router();

router.post("/new-blog", createOrEditBlog);
router.post("/edit-blog/:_id", createOrEditBlog);
router.get("/blogs", getBlog);
router.post("/blogs/:blogId", deleteBlog);
export default router;
