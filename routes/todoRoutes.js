const express = require("express");

const router = express.Router();
const {
  handleAddTodo,
  handleGetAllTodos,
} = require("../controllers/todoController");

router.post("/todocreate", handleAddTodo);
router.get("/getTodo", handleGetAllTodos);

module.exports = router;
