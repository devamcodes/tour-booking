import user from "../models/user.js";

export const checkUsers = async (req, res) => {
	try {
		const { email, password } = req.body;
		const User = await user.findOne({ email, password });
		if (User) {
			res.status(200).json({ success: true, token: "Something" });
		} else {
			res.status(400).json({ success: false, message: "Email and  Password do not match" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { username, email, mobile, password, dateOfBirth, bloodgrp, gender } = req.body;
		const existing = await user.findOne({
			username,
			email,
			password,
			mobile,
			bloodgrp,
			dateOfBirth,
			gender,
		});

		if (existing) {
			res.status(400).json({ success: false, message: "Unale to create the user already exist." });
		} else {
			const newUser = await user.create(req.body);
			res.status(200).json(newUser);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getParticularUserId = async (req, res) => {
	try {
		const { email } = req.body;
		const existing = await user.findOne({ email: email });
		if (existing) {
			res.status(200).json({ success: true, id: existing._id, message: "User Found" });
		} else {
			res.status(404).json({ success: false, message: "User Not Found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updatePassword = async (req, res) => {
	try {
		const { id } = req.params;
		const { password } = req.body;
		const existing = await user.findById(id);
		if (existing) {
			if (existing.password === password) {
				res.json({
					success: false,
					message: "try Creating unique passwords. you must have used the used password",
				});
			} else {
				existing.password = password;
				existing.save();
				res.status(200).json({ success: true, message: "Password Updated successfully" });
			}
		} else {
			res.status(404).json({ success: false, message: "User Not Found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
