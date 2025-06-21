const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", resumeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
