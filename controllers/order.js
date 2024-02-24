const Order = require('../models/orders');
const Cart = require('../models/cart');

// Controller function to place an order
module.exports.placeOrder = async (req, res) => {
    try {
        const { user } = req;

        // Find the user's cart
        const cart = await Cart.findOne({ user: user._id }).populate("items.product");

        // If the cart doesn't exist or is empty, return an error
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cannot place order because cart is empty" });
        }

        // Calculate total price of items in the cart
        const totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

        // Create an order object
        const order = new Order({
            user: user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice
        });

        // Save the order to the database
        await order.save();

        // Clear the user's cart
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Controller function to get the user's order history
module.exports.getOrderHistory = async (req, res) => {
    try {
        const { user } = req;

        // Find orders associated with the user
        const orders = await Order.find({ user: user._id }).populate("items.product");

        res.status(200).json({ message: "Order history retrieved successfully", orders });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Controller function to get the details of a specific order
module.exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find the order by its ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order details retrieved successfully', order });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}