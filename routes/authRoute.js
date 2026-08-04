const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../models/userSchema");

// router.get("/reg", (req, res) => {

// });

// router.post("/login", (req, res) => {
//   const { email } = req.body;
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "nabil1000cc@gmail.com",
    pass: "ecqdooxiqrurlfgm",
  },
});

router.post("/sendotp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is require",
    });
  }
  let otp = otpGenerator.generate(6);
  let exMail = await User.findOne({ email: email });
  if (!exMail) {
    let user = await new User({
      email: email,
      otp: otp,
    }).save();
  } else {
    await User.findOneAndUpdate({ email: email }, { otp: otp });
  }
  const info = await transporter.sendMail({
    from: '"Dev Team" nabil1000cc@gmail.com',
    to: email,
    subject: "Hello OTP",
    html: `<body style=margin:0;padding:0;background-color:#f4f4f4><table border=0 cellpadding=0 cellspacing=0 width=100% style=background-color:#f4f4f4><tr><td style="padding:40px 20px"align=center><table border=0 cellpadding=0 cellspacing=0 width=600 style=width:600px;background:#fff><tr><td style=background:#2563eb;padding:40px align=center><h1 style=margin:0;font-family:Arial,Helvetica,sans-serif;font-size:32px;font-weight:700;color:#fff>Your Company</h1><tr><td style="padding:40px 30px;font-family:Arial,Helvetica,sans-serif"><h2 style="margin:0 0 20px;font-size:28px;color:#333">Welcome! OTP - ${otp}</h2><p style=margin:0;font-size:16px;line-height:26px;color:#666>Thank you for joining us. We’re excited to have you on board. This template is built entirely with tables and inline CSS for maximum email client compatibility.<tr><td style="padding:0 30px 40px"align=center><table border=0 cellpadding=0 cellspacing=0><tr><td style=background:#2563eb align=center><a href=https://example.com style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#fff;text-decoration:none">Get Started</a></table><tr><td style="padding:20px 30px 40px"><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding:10px align=center valign=top width=33.33%><div style=font-size:40px>🚀</div><h3 style="margin:15px 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#333">Fast</h3><p style=margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#666>Lightning-fast performance.<td style=padding:10px align=center valign=top width=33.33%><div style=font-size:40px>🔒</div><h3 style="margin:15px 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#333">Secure</h3><p style=margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#666>Enterprise-level protection.<td style=padding:10px align=center valign=top width=33.33%><div style=font-size:40px>💬</div><h3 style="margin:15px 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#333">Support</h3><p style=margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#666>Friendly customer support.</table><tr><td style="padding:0 30px"><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style="border-top:1px solid #e5e5e5;font-size:0;line-height:0"> </table><tr><td style=padding:30px;font-family:Arial,Helvetica,sans-serif align=center><p style="margin:0 0 10px;font-size:13px;color:#999">© 2026 Your Company. All rights reserved.</p><a href=# style=font-size:13px;color:#2563eb;text-decoration:none>Privacy Policy</a> <span style=color:#ccc>| </span><a href=# style=font-size:13px;color:#2563eb;text-decoration:none>Unsubscribe</a></table></body>`,
  });
  console.log("Message sent : %s", info.messageId);
  res.json("Done");
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
});

module.exports = router;
