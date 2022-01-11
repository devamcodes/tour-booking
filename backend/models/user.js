import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	dateOfBirth: Date,
	bloodgrp: String,
	gender: String,
	mobile: Number,
});

const user = mongoose.model("user", userSchema);
export default user;
