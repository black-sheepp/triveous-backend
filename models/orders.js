const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true },
	// Other fields as needed
});

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		items: [orderItemSchema],
		// Other fields as needed
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
