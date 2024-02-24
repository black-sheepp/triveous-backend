const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		availability: {
			type: Boolean,
			default: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category", // Reference to Category schema for association
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
