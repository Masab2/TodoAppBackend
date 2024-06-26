const {
  handleUserSignUp,
  handleUserLogin,
  handleGetUserData,
} = require("../controllers/authController");
const express = require("express");

const router = express.Router();

// For Create the Account
router.post("/signup", handleUserSignUp);

// For Login the Account
router.post("/login", handleUserLogin);

// Get Request For Checking that the Server is Working or Not
router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Working" });
});

// get the user data
router.get('/getUserData', handleGetUserData);

module.exports = router;
