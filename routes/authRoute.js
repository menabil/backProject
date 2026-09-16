const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../models/userSchema");
const { sendOtp } = require("../controller/authController");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "nabil1000cc@gmail.com",
    pass: "ecqdooxiqrurlfgm",
  },
});

router.post("/sendotp", sendOtp);

router.post("/login/:email", async (req, res) => {
  const { email } = req.params;
  const { otp } = req.body;

  let exMail = await User.findOne({ email: email });

  if (exMail.isLogin) {
    return res.send("Logout koro");
  }
  if (!exMail.otp) {
    return res.send("Calak");
  }

  if (exMail.otp == otp) {
    await User.findOneAndUpdate({ email: email }, { otp: "", isLogin: true });
    res.send("Login");
  } else {
    res.send("Otp not match");
  }
});

module.exports = router;
