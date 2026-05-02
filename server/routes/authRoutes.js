const express = require("express");

const { register, login } = require("../controllers/authController");

const router = express.Router();

//if a client posts at this endpoint ,the register or login function triggers.
router.post("/register", register);
router.post("/login", login);

module.exports = router;