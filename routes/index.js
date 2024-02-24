const router = require("express").Router();
const userController = require("../controllers/users");
const productController = require("../controllers/product");
const protectUser = require("../config/authMiddleware");
const cartController = require("../controllers/cart");
const orderController = require("../controllers/order")


// user authorization and authentication
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/get-categories", protectUser,productController.getCategories);

// product category and product management
router.post("/create-category", protectUser,productController.createCategory);
router.post("/create-product", protectUser, productController.createProduct);
router.get("/get-productListBycategory/:categoryId", protectUser, productController.getProductsByCategoryId);
router.get("/get-product/:productId", protectUser, productController.getProductById);

// Routes for cart management
router.post('/add-to-cart', protectUser, cartController.addToCart);
router.get('/view-cart', protectUser, cartController.viewCart);
router.put('/update-cart-items/:itemId', protectUser, cartController.updateCartItem);
router.delete('/remove-cart-items/:itemId', protectUser, cartController.removeCartItem);

// Routes for order management
router.get('/place-order', protectUser, orderController.placeOrder);


module.exports = router;
