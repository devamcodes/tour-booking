import Blog from "../models/blog.js";
//Create The Blog
// export const createBlog = async (req, res) => {
// 	try {
// 		const { Title, Description } = req.body;
// 		let Blogs = await Blog.findOne({ Title });

// 		if (Blogs) {
// 			res.status(400).json({
// 				success: false,
// 				message: "Unale to create the blog with same titile already exist.",
// 			});
// 		} else {
// 			Blogs = new Blog({ Title, Description, isDeleted: false });
// 			await Blogs.save();
// 			res.status(200).json({ success: true, message: "Blog Created Successfully" });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// ////////////////////////////////////////////
export const createOrEditBlog = async (req, res) => {
	try {
		const { Title, Description } = req.body;
		const { _id } = req.params;
		let Blogs;
		if (_id) {
			Blogs = await Blog.findById(_id);
			Blogs.Title = Title;
			Blogs.Description = Description;
			await Blogs.save();
			res
				.status(200)
				.json({ success: true, message: _id ? "Blog Edited Successfully" : "Blog Created Successfully" });
		} else {
			Blogs = await Blog.findOne({ Title });
			if (Blogs) {
				res.status(400).json({
					success: false,
					message: "Unale to create the blog with same titile already exist.",
				});
			} else {
				Blogs = new Blog({ Title, Description, isDeleted: false });
				await Blogs.save();
				res.status(200).json({ success: true, message: "Blog Created Successfully" });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}; ////////////////////////////////////////

// export const editBlog = async (req, res) => {
// 	try {
// 		const { Title, Description } = req.body;
// 		const { id } = req.params;
// 		let blog = await Blog.findById(id);
// 		blog.Title = Title;
// 		blog.Description = Description;
// 		await blog.save();
// 		res.status(200).json({ success: true, message: "Blog Edited Successfully" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };
export const getBlog = async (req, res) => {
	try {
		const data = await Blog.find({ isDeleted: { $eq: false } });
		if (!data || data.length === 0) {
			res.status(400).json({ success: false, message: "No Data Found" });
		}
		res.status(200).json({ success: true, message: "List of Blogs Retrived!!", data: data });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
export const deleteBlog = async (req, res) => {
	try {
		const { blogId } = req.params;
		const blog = await Blog.findById(blogId);
		if (blog && !blog.isDeleted) {
			blog.isDeleted = true;
			blog.save();
			res.status(200).json({ success: true, message: "Blog Deleted Successflly!!" });
		}
		if (!blog || blog.isDeleted) {
			res.status(404).json({ success: false, message: "Blog not found!!!" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
