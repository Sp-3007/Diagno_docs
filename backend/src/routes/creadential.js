const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authenticate_user");
const user = require("../controllers/creadential");

// Register route with middleware
router.post("/register", authentication, user.user_Register);

router.get("/login", authentication, user.user_Login);

module.exports = router;
