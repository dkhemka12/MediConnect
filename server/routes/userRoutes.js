const express = require("express");

const { getUsers, getDoctors } = require("../controllers/userController");

const router = express.Router();

router.get("/doctors", getDoctors);
router.get("/", getUsers);

module.exports = router;
