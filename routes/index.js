const router = require("express").Router();
const userController = require("../controllers/users");


// user authorization and authentication
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

module.exports = router;
