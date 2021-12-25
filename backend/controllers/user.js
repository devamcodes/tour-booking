import user from "../models/user.js";

export const getUsers = async (req, res) => {
	try {
		const allUsers = await user.find();
		res.status(200).json(allUsers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { name, email, password, bloodgrp } = req.body;
		const existing = await user.findOne({
			name: name,
			email: email,
			password: password,
			bloodgrp: bloodgrp,
		});
		console.log(`existing`, existing);

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
