const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ADD THESE TWO LINES HERE
console.log("protect:", typeof protect);
console.log("authorizeRoles:", typeof authorizeRoles);

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile",
    user: req.user,
  });
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
});

module.exports = router;