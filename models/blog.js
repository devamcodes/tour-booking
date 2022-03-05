import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
	Title: String,
	Description: String,
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
