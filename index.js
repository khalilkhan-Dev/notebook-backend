require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const TaskRoutes = require("./routes/TaskRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Database Connection
ConnectDB();

// Routes
app.use("/", authRoutes);
app.use("/", TaskRoutes);

// Test Route
app.get("/test", (req, res) => {
  console.log("Test endpoint hit");
  res.send("Test endpoint working");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
