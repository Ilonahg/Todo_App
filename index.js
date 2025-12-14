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

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// JSON
app.use(express.json());

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Server + DB working 🚀");
});

/* =======================
   REGISTER
======================= */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (error) {
    console.error("REGISTER error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   LOGIN
======================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
   console.log("JWT_SECRET =", process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("LOGIN error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   AUTH TEST
======================= */
app.get("/me", auth, (req, res) => {
  res.json({
    message: "Authenticated",
    userId: req.userId,
  });
});

/* =======================
   TODOS
======================= */

// CREATE
app.post("/todos", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const todo = await Todo.create({
      title,
      completed: false,
      user: req.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("POST /todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET
app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (error) {
    console.error("GET /todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE
app.patch("/todos/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error("PATCH /todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE
app.delete("/todos/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("DELETE /todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   DATABASE + SERVER
======================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB error ❌", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
