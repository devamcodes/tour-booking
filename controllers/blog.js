import Blog from "../models/blog.js";
//Create The Blog
export const createBlog = async (req, res) => {
	try {
		const { Title, Description } = req.body;
		let Blogs = await Blog.findOne({ Title });

		if (Blogs) {
			res.status(400).json({
				success: false,
				message: "Unale to create the blog with same titile already exist.",
				Blogs,
			});
		} else {
			Blogs = new Blog({ Title, Description });
			await Blogs.save();
			res.status(200).json({ success: true, message: "Blog Created Successfully" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getBlog = async (req, res) => {
	try {
		const data = await Blog.find();
		if (!data || data.length === 0) {
			res.status(400).json({ success: false, message: "No Data Found" });
		}
		res.status(200).json({ success: true, message: "List of Blogs Retrived!!", data: data });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
