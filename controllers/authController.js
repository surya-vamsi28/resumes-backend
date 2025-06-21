const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../prismaClient");

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({
    message: "User registered",
    user: { id: user.id, email: user.email },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
