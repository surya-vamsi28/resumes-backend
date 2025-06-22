const express = require("express");
const multer = require("multer");
const { getResume } = require("../controllers/resumeController");
const { authenticateToken } = require("../middleware/auth");
const cors = require("cors");
const { corsOptions } = require("../constants/cors");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/resume",
  cors(corsOptions),
  authenticateToken,
  upload.single("pdf"),
  getResume
);

module.exports = router;
