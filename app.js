const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
