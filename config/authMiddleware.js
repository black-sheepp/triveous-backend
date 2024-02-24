const User = require("../models/users");
const jwt = require("jsonwebtoken");

const protectUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // verify token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from decoded token
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid user" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = protectUser;
