import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import jwt from "jsonwebtoken";

import  authenticateToken  from "./utilities.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js";


dotenv.config();


const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));


mongoose
  .connect(config.connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ Basic route
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// ✅ Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full name, email, and password are required",
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successful",
  });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login successful",
      email,
      accessToken,
    });
  }

  return res.status(400).json({
    error: true,
    message: "Invalid credentials",
  });
});


app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags && typeof isPinned === "undefined") {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;
    try {
        const notes = await Note.find({ userId: user._id
                        }).sort({isPinned: -1
        });
        return res.json({
                error: false,
                notes,
                message: "All notes retrieved successfully",
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            })};
});

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  if (isPinned === undefined) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/get-user",authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn},
    message: ""
  });
});





app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

export default app;
