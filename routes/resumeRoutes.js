const express = require("express");
const multer = require("multer");
const { getResume } = require("../controllers/resumeController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/resume", authenticateToken, upload.single("pdf"), getResume);

module.exports = router;
