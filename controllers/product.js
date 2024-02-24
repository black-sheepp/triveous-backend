const Category = require("../models/productCategory");

// Controller function to create a new product category
module.exports.createCategory = async (req, res) => {
	try {
		// Check if the user is authorized (admin or seller)
		if (!req.user || (req.user.role !== "admin" && req.user.role !== "seller")) {
			return res.status(403).json({ message: "You are not authorized to perform this action" });
		}

		// Create the category
		const category = new Category({
			name: req.body.name,
		});

		// Save the category to the database
		await category.save();

		// Return success message
		res.status(201).json({ message: "Category created successfully", category });
	} catch (error) {
		// If an error occurs, return 500 Internal Server Error status
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};
