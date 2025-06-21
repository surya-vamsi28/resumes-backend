const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your_jwt_secret",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

module.exports = { authenticateToken };
