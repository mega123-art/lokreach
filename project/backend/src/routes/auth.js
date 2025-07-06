// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();

// Middleware to log route access
router.use((req, res, next) => {
  console.log(`🔐 Auth route: ${req.method} ${req.path}`);
  next();
});

// POST /signup
router.post("/signup", async (req, res) => {
  try {
    console.log("=== SIGNUP REQUEST START ===");
    console.log("Request body:", { ...req.body, password: "[HIDDEN]" });
    console.log("Request headers:", req.headers);

    const { email, password, role, username, contactEmail } = req.body;

    // Enhanced validation
    if (!email || !password || !role) {
      console.log("❌ Validation failed: Missing required fields");
      return res.status(400).json({
        error: "Email, password, and role are required",
        received: { email: !!email, password: !!password, role: !!role },
      });
    }

    if (!["creator", "brand", "admin"].includes(role)) {
      console.log("❌ Validation failed: Invalid role:", role);
      return res.status(400).json({
        error: "Invalid role specified. Must be 'creator', 'brand', or 'admin'",
      });
    }

    if (role === "creator" && !username) {
      console.log("❌ Validation failed: Username required for creator");
      return res
        .status(400)
        .json({ error: "Username is required for creators" });
    }

    if (role === "creator" && !contactEmail) {
      console.log("❌ Validation failed: Contact email required for creator");
      return res
        .status(400)
        .json({ error: "Contact email is required for creators" });
    }

    // Check if email already exists
    console.log("🔍 Checking if email exists:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists:", email);
      return res.status(409).json({ error: "Email already in use" });
    }

    // Check username uniqueness for creators
    if (role === "creator") {
      console.log("🔍 Checking if username exists:", username);
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        console.log("❌ Username already exists:", username);
        return res.status(409).json({ error: "Username already taken" });
      }
    }

    console.log("🔒 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("👤 Creating new user...");
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      username: role === "creator" ? username : undefined,
      contactEmail: role === "creator" ? contactEmail : undefined,
    });

    await newUser.save();

    console.log("✅ User created successfully:", {
      id: newUser._id,
      email,
      role,
      username: newUser.username,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username,
      },
    });

    console.log("=== SIGNUP REQUEST END ===");
  } catch (err) {
    console.error("=== SIGNUP ERROR ===");
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);

    // Handle specific MongoDB errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        error: `${field} already exists`,
        field: field,
      });
    }

    res.status(500).json({
      error: "Server error during registration",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// POST /create-admin (temporary endpoint for creating admin)
router.post("/create-admin", async (req, res) => {
  try {
    console.log("=== CREATE ADMIN REQUEST START ===");
    const { email, password, adminSecret } = req.body;

    // Simple secret check - in production, use environment variable
    if (adminSecret !== "admin123") {
      console.log("❌ Invalid admin secret provided");
      return res.status(403).json({ error: "Invalid admin secret" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Admin email already exists:", email);
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("✅ Admin created successfully:", { id: newAdmin._id, email });

    res.status(201).json({ message: "Admin user created successfully" });
    console.log("=== CREATE ADMIN REQUEST END ===");
  } catch (err) {
    console.error("=== CREATE ADMIN ERROR ===");
    console.error("Error details:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  try {
    console.log("=== SIGNIN REQUEST START ===");
    console.log("Request body:", {
      email: req.body.email,
      password: "[HIDDEN]",
    });
    console.log("Request headers:", req.headers);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Validation failed: Missing email or password");
      return res.status(400).json({
        error: "Email and password are required",
        received: { email: !!email, password: !!password },
      });
    }

    console.log("🔍 Looking for user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User found:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });
    console.log("🔒 Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not configured");
      return res.status(500).json({ error: "Server configuration error" });
    }

    console.log("🎫 Generating JWT token...");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ User signed in successfully:", {
      id: user._id,
      email,
      role: user.role,
      username: user.username,
    });

    res.status(200).json({
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
    });

    console.log("=== SIGNIN REQUEST END ===");
  } catch (err) {
    console.error("=== SIGNIN ERROR ===");
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({
      error: "Server error during sign in",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// POST /forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    console.log("=== FORGOT PASSWORD REQUEST ===");
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for password reset:", email);
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Replace this with actual email sending logic
    const resetLink = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password/${token}`;
    console.log(`🔗 Reset link: ${resetLink}`);

    res.status(200).json({
      message: "Reset link sent (check server log)",
      resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log("=== RESET PASSWORD REQUEST ===");

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("❌ User not found for password reset");
      return res.status(404).json({ error: "User not found" });
    }

    const hashed = await bcrypt.hash(password, 12);
    user.password = hashed;
    await user.save();

    console.log("✅ Password reset successfully for user:", user.email);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// GET /check-username
router.get("/check-username", async (req, res) => {
  try {
    console.log("=== USERNAME CHECK REQUEST ===");
    const username = req.query.value;
    console.log("🔍 Checking username:", username);

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const exists = await User.findOne({ username });
    const available = !exists;

    console.log("✅ Username check result:", { username, available });

    res.status(200).json({ available });
  } catch (err) {
    console.error("Username check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
