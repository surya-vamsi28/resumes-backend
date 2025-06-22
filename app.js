const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Define the list of allowed origins
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://your-production-frontend.com",
//   "http://another-frontend.local",
// ];

// --- CORS middleware ---
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// ✅ MUST be before routes: handle preflight OPTIONS for all routes
// app.options("*", cors());
// app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", resumeRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
