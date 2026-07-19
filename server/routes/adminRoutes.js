const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const adminController = require("../controllers/adminController");


router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllUsers
);


router.put(
  "/users/:id/ban",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.banUser
);
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.deleteUser
);
router.get(
  "/events",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllEvents
);
router.delete(
  "/events/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.deleteEvent
);
module.exports = router;