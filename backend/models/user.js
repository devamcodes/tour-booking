import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { String, require: true },
	email: { String, require: true },
	password: { String, require: true },
	dateOfBirth: { Date, require: true },
	bloodGroup: { String, require: true },
	address: String,
});

const user = mongoose.model("user", userSchema);
export default user;
