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

// Controller function to view the user's cart
module.exports.viewCart = async (req, res) => {
	try {
		const { user } = req;

		// Find the user's cart
		const cart = await Cart.findOne({ user: user._id }).populate("items.product");

		// If the cart doesn't exist or is empty, return an empty array
		if (!cart || cart.items.length === 0) {
			return res.status(200).json({ message: "Cart is empty", cart: [] });
		}

		res.status(200).json({ message: "Cart retrieved successfully", cart: cart.items });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// Controller function to update the quantity of a product in the user's cart
module.exports.updateCartItem = async (req, res) => {
	try {
		const { itemId } = req.params;
		const { quantity } = req.body;

		// Find the cart item by ID and update its quantity
		const updatedCart = await Cart.findOneAndUpdate(
			{ "items._id": itemId }, // Find cart item by its ID
			{ $set: { "items.$.quantity": quantity } }, // Update the quantity of the specific item
			{ new: true } // Return the modified document
		);

		if (!updatedCart) {
			return res.status(404).json({ message: "Cart item not found" });
		}

		res.status(200).json({ message: "Cart item updated successfully", cart: updatedCart });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// Controller function to remove a product from the user's cart
module.exports.removeCartItem = async (req, res) => {
	try {
		const { itemId } = req.params;

		// Find the cart item by ID and remove it
		const updatedCart = await Cart.findOneAndUpdate(
			{ "items._id": itemId }, // Find cart item by its ID
			{ $pull: { items: { _id: itemId } } }, // Remove the item from the array
			{ new: true } // Return the modified document
		);

		if (!updatedCart) {
			return res.status(404).json({ message: "Cart item not found" });
		}

		res.status(200).json({ message: "Cart item removed successfully", cart: updatedCart });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};
