const Product = require("../models/products");
const Cart = require("../models/cart");

// Controller function to add a product to the user's cart
module.exports.addToCart = async (req, res) => {
	try {
		const { productId, quantity } = req.body;
		const { user } = req;

		// Find the product to add to the cart
		const product = await Product.findById(productId);

		// Check if the product exists
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Check if the user already has a cart
		let cart = await Cart.findOne({ user: user._id });

		// If user doesn't have a cart, create a new one
		if (!cart) {
			cart = new Cart({
				user: user._id,
				items: [],
			});
		}

		// Check if the product is already in the cart
		const existingItemIndex = cart.items.findIndex((item) => item.product.equals(productId));

		// If the product is already in the cart, update its quantity
		if (existingItemIndex !== -1) {
			cart.items[existingItemIndex].quantity += quantity;
		} else {
			// Otherwise, add a new item to the cart
			cart.items.push({ product: productId, quantity });
		}

		// Save the updated cart to the database
		await cart.save();

		res.status(200).json({ message: `Product ${product.title} added to cart successfully` });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};
