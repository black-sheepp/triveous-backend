const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please enter a name"],
		},
		email: {
			type: String,
			required: [true, "Please enter an email address"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Please enter a valid password"],
			minLength: [6, "Please enter a valid password with at least 6 characters"],
		},
		phone: {
			type: String,
			maxLength: [10, "Please enter a valid phone number"],
		},
		address: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user", "seller"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

// encrypt the password before saving to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	// hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword;
	next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
