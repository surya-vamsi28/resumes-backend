const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");

// Define the list of allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-frontend.com",
  "http://another-frontend.local",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Optional: enable if using cookies or authorization headers
  })
);
// ✅ This line is essential to handle preflight
app.options("*", cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", resumeRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
