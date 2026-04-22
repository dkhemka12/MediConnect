const express = require("express");

const { getUsers, getDoctors, getPatients } = require("../controllers/userController");

const router = express.Router();

router.get("/doctors", getDoctors);
router.get("/patients", getPatients);
router.get("/", getUsers);

module.exports = router;
