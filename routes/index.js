const router = require("express").Router();
const userController = require("../controllers/users");
const productController = require("../controllers/product");
const protectUser = require("../config/authMiddleware");



// user authorization and authentication
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/get-categories", protectUser,productController.getCategories);

// product category and product management
router.post("/create-category", protectUser,productController.createCategory);


module.exports = router;
