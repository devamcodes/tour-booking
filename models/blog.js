import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
	Title: String,
	Description: String,
	isDeleted: { type: Boolean, default: false, required: true },
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
