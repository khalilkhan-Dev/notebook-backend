const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTask,
  taskById,
  updateTask,
  taskDelete,
} = require("../controller/TaskController");

const router = express.Router();

// routes for get update delete
router.post("/tasks", authMiddleware, createTask);

router.get("/tasks", authMiddleware, getTask);

router.get("/tasks/:id", authMiddleware, taskById);

router.put("/tasks/:id", authMiddleware, updateTask);

router.delete("/tasks/:id", authMiddleware, taskDelete);

module.exports = router;
