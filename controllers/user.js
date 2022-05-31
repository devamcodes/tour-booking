import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Login User
export const checkUsers = async (req, res) => {
	try {
		const { email, password } = req.body;
		const User = await user.findOne({ email });
		if (User) {
			const isMatch = await bcrypt.compare(password, User.password);
			if (isMatch) {
				const payload = {
					user: {
						id: User.id,
					},
				};

				jwt.sign(
					payload,
					process.env.jwtSecret,
					{
						expiresIn: 360000,
					},
					(err, token) => {
						if (err) throw err;
						res.status(200).json({
							success: true,
							token: token,
							message: "Login Successfull",
						});
					}
				);
			} else {
				res.status(400).json({ success: false, message: "Email and  Password do not match" });
			}
		} else {
			res.status(400).json({ success: false, message: "User Does Not Exist." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//Register User
export const createUser = async (req, res) => {
	try {
		const { username, email, mobile, password, dateOfBirth, bloodgrp, gender } = req.body;
		let User = await user.findOne({ email });

		if (User) {
			res.status(400).json({ success: false, message: "Unale to create the user already exist." });
		} else {
			User = new user({ username, email, mobile, password, dateOfBirth, bloodgrp, gender });
			const salt = await bcrypt.genSalt(2);
			User.password = await bcrypt.hash(password, salt);
			await User.save();
			const payload = {
				user: {
					id: User.id,
				},
			};
			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			res.status(200).json({ User, message: "Account Created" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//Get User Info
export const getParticularUserId = async (req, res) => {
	try {
		const { email } = req.body;
		const existing = await user.find({ email });
		if (existing) {
			res.status(200).json({ success: true, id: existing._id, message: "User Found" });
		} else {
			res.status(404).json({ success: false, message: "User Not Found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

//Forgot Password
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
