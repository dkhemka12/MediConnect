const express = require("express");
const { protect, requireRole } = require("../middleware/authMiddleware");

const {
  getUsers,
  getDoctors,
  setUserActivation,
} = require("../controllers/userController");

const router = express.Router();

router.get("/doctors", getDoctors);
router.get("/", protect, requireRole("admin"), getUsers);
router.put("/:id/activation", protect, requireRole("admin"), setUserActivation);

module.exports = router;
