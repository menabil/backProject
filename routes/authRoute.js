const express = require("express");
const router = express.Router();
const { sendOtp, login } = require("../controller/authController");

router.post("/sendotp", sendOtp);

router.post("/login/:email", login);

module.exports = router;
