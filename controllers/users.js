const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

module.exports.createUser = async function (req, res) {
	const { username, email, password, phone, address, role } = req.body;

	if (!email || !password || !phone || !username || !address) {
		return res.status(403).json({ message: "Please enter all details." });
	}

	if (password.length < 6) {
		return res.status(403).json({ message: "Password must be at least 6 characters" });
	}

	const emailExists = await User.findOne({ email });
	if (emailExists) {
		return res.status(403).json({ message: "Email already exists" });
	}

	const user = await User.create({
		username: username,
		email: email,
		password: password,
		phone: phone,
		address: address,
		role: role || "user",
	});

	// generate token
	const token = generateToken(user._id);

	// send http-only cookie as response to bearer side
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400),
		sameSite: "none",
		secure: true,
	});

	if (user) {
		const { username, email, phone, address } = user;
		return res.status(200).json({
			username,
			email,
			phone,
			address,
			role,
			token,
		});
	}
};

module.exports.loginUser = async function (req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	// validate request parameters
	if (!email || !password) {
		return res.status(403).json({ message: "Please enter a valid email/password." });
	}

	// if user exists
	const userExists = await User.findOne({ email });
	if (!userExists) {
		return res.status(403).json({ message: "User does not exist. Please Sign up." });
	}

	// if user exists and password is correct
	if (user) {
		const correctPassword = await bcrypt.compare(password, user.password);

		// generate token
		const token = generateToken(user._id);

		// send http-only cookie as response to bearer side
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400),
			sameSite: "none",
			secure: true,
		});

		if (userExists && correctPassword) {
			const { username, email, phone, address } = user;
			return res.status(200).json({
				username,
				email,
				phone,
				address,
				token,
			});
		} else {
			res.status(400).json({ message: "Invalid password or email address" });
		}
	}
};

module.exports.logoutUser = async function (req, res) {
	// send expired http-only cookie as response to bearer side for logout
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});
	return res.status(200).json({ message: "User logged in successfully" });
};
