const express = require("express");
const router = express.Router();

// router.get("/reg", (req, res) => {

// });

// router.post("/login", (req, res) => {
//   const { email } = req.body;
// });

router.post("/sendotp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is require",
    });
  } else {
  
  }
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
