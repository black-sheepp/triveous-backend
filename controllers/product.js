const Category = require("../models/productCategory");
const Product = require("../models/products");
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

// Controller function to get a list of categories
module.exports.getCategories = async (req, res) => {
	try {
		// Fetch all categories from the database
		const categories = await Category.find({}, "name");

		// Return the list of categories
		res.status(200).json(categories);
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

module.exports.createProduct = async (req, res) => {
	try {
		// Check if the user is authorized (admin or seller)
		if (!req.user || (req.user.role !== "admin" && req.user.role !== "seller")) {
			return res.status(403).json({ message: "You are not authorized to perform this action" });
		}

		// Check if the category exists
		const category = await Category.findOne({ name: req.body.category });
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		// Create the product
		const product = new Product({
			title: req.body.title,
			price: req.body.price,
			description: req.body.description || "",
			availability: req.body.availability || true,
			category: category._id, // Use the ObjectId of the found category
		});

		// Save the product to the database
		await product.save();

		// Return success message
		res.status(201).json({ message: "Product created successfully", product });
	} catch (error) {
		// If an error occurs, return 500 Internal Server Error status
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

module.exports.getProductsByCategoryId = async (req, res) => {
	try {
		const { categoryId } = req.params;
		console.log(req.params);

		// Fetch products from the database based on category ID
		const products = await Product.find({ category: categoryId }).select("title price description availability");

		// Return the list of products
		res.status(200).json(products);
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// Controller function to get product details by product ID
module.exports.getProductById = async (req, res) => {
	try {
		const { productId } = req.params;

		// Fetch product from the database based on product ID
		const product = await Product.findById(productId);

		// Check if the product exists
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Return the product details
		res.status(200).json(product);
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};
