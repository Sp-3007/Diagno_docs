const express = require("express");
const router = express.Router();
const Test_list = require("../controllers/Test_list");

router.get("/", Test_list);
module.exports = router;
