const corsOptions = {
  origin: ["http://localhost:5173", "https://your-production-frontend.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

module.exports = { corsOptions };
