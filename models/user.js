import mongoose from "mongoose";

const registeredUserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	dateOfBirth: Date,
	bloodgrp: String,
	gender: String,
	mobile: Number,
});

const user = mongoose.model("user", registeredUserSchema);
export default user;
