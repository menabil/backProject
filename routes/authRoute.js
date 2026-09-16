const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../models/userSchema");
const { sendOtp, login } = require("../controller/authController");



router.post("/sendotp", sendOtp);

router.post("/login/:email", login);

module.exports = router;
