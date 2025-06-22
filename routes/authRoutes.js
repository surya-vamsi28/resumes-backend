const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const cors = require("cors");
const { corsOptions } = require("../constants/cors");

router.options("/register", cors(corsOptions));
router.options("/login", cors(corsOptions));
router.post("/register", cors(corsOptions), register);
router.post("/login", cors(corsOptions), login);

module.exports = router;
