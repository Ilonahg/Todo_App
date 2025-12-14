const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

const router = express.Router();

// GET todos
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

// POST todo
router.post("/", auth, async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.userId,
  });
  res.json(todo);
});

module.exports = router;



