const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Todo = require("./models/Todo");
const auth = require("./middleware/auth");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({ origin: true }));
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.get("/", (req, res) => {
  res.send("Server + DB working 🚀");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/me", auth, (req, res) => {
  res.json({ userId: req.userId });
});

app.post("/todos", auth, async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      completed: false,
      user: req.userId,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error("CREATE TODO ERROR:", err);
    res.status(500).json({ message: "Create failed" });
  }
});

app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    console.error("GET TODOS ERROR:", err);
    res.status(500).json({ message: "Get failed" });
  }
});

app.patch("/todos/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    console.error("UPDATE TODO ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

app.delete("/todos/:id", auth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE TODO ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

/* =======================
   START SERVER ONLY AFTER DB
======================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  });

