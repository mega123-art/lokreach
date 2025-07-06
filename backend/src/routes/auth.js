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
    console.log('=== SIGNUP REQUEST START ===');
    console.log('Request body:', { ...req.body, password: '[HIDDEN]' });
    console.log('Request headers:', req.headers);

    const { email, password, role, username, contactEmail } = req.body;

    // Enhanced validation
    if (!email || !password || !role) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        error: "Email, password, and role are required",
        received: { email: !!email, password: !!password, role: !!role },
      });
    }

    if (!["creator", "brand", "admin"].includes(role)) {
      console.log('❌ Validation failed: Invalid role:', role);
      return res.status(400).json({
        error: "Invalid role specified. Must be 'creator', 'brand', or 'admin'",
      });
    }

    if (role === "creator" && !username) {
      console.log('❌ Validation failed: Username required for creator');
      return res.status(400).json({ 
        error: "Username is required for creators" 
      });
    }

    if (role === "creator" && !contactEmail) {
      console.log('❌ Validation failed: Contact email required for creator');
      return res.status(400).json({ 
        error: "Contact email is required for creators" 
      });
    }

    // Normalize inputs
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username ? username.toLowerCase().trim() : null;
    const normalizedContactEmail = contactEmail ? contactEmail.toLowerCase().trim() : null;

    // Validate username format for creators
    if (role === "creator" && normalizedUsername) {
      if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
        console.log('❌ Validation failed: Invalid username format:', normalizedUsername);
        return res.status(400).json({ 
          error: "Username can only contain letters, numbers, and underscores" 
        });
      }

      if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
        console.log('❌ Validation failed: Username length invalid:', normalizedUsername);
        return res.status(400).json({ 
          error: "Username must be between 3 and 30 characters" 
        });
      }
    }

    // Check if email already exists
    console.log('🔍 Checking if email exists:', normalizedEmail);
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log('❌ Email already exists:', normalizedEmail);
      return res.status(409).json({ 
        error: "Email already in use",
        field: "email"
      });
    }

    // Check username uniqueness for creators
    if (role === "creator" && normalizedUsername) {
      console.log('🔍 Checking if username exists:', normalizedUsername);
      const isAvailable = await User.isUsernameAvailable(normalizedUsername);
      if (!isAvailable) {
        console.log('❌ Username already exists:', normalizedUsername);
        return res.status(409).json({ 
          error: "Username already taken",
          field: "username"
        });
      }
    }

    console.log('🔒 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('👤 Creating new user...');
    const newUser = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role,
      username: role === "creator" ? normalizedUsername : undefined,
      contactEmail: role === "creator" ? normalizedContactEmail : undefined,
    });

    await newUser.save();

    console.log('✅ User created successfully:', {
      id: newUser._id,
      email: normalizedEmail,
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

    console.log('=== SIGNUP REQUEST END ===');
  } catch (err) {
    console.error("=== SIGNUP ERROR ===");
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);

    // Handle specific MongoDB errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      console.log('❌ Duplicate key error:', { field, value });
      
      let errorMessage = `${field} already exists`;
      if (field === 'username') {
        errorMessage = "Username already taken";
      } else if (field === 'email') {
        errorMessage = "Email already in use";
      }
      
      return res.status(409).json({
        error: errorMessage,
        field: field,
        value: value
      });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
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
    console.log('=== CREATE ADMIN REQUEST START ===');
    const { email, password, adminSecret } = req.body;

    // Simple secret check - in production, use environment variable
    if (adminSecret !== "admin123") {
      console.log('❌ Invalid admin secret provided');
      return res.status(403).json({ error: "Invalid admin secret" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log('❌ Admin email already exists:', normalizedEmail);
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log('✅ Admin created successfully:', { id: newAdmin._id, email: normalizedEmail });

    res.status(201).json({ message: "Admin user created successfully" });
    console.log('=== CREATE ADMIN REQUEST END ===');
  } catch (err) {
    console.error("=== CREATE ADMIN ERROR ===");
    console.error("Error details:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  try {
    console.log('=== SIGNIN REQUEST START ===');
    console.log('Request body:', {
      email: req.body.email,
      password: '[HIDDEN]',
    });
    console.log('Request headers:', req.headers);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      return res.status(400).json({
        error: "Email and password are required",
        received: { email: !!email, password: !!password },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    console.log('🔍 Looking for user with email:', normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('❌ User not found:', normalizedEmail);
      return res.status(404).json({ error: "User not found" });
    }

    console.log('✅ User found:', {
      id: user._id,
      email: user.email,
      role: user.role,
    });
    console.log('🔒 Comparing password...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for user:', normalizedEmail);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not configured');
      return res.status(500).json({ error: "Server configuration error" });
    }

    console.log('🎫 Generating JWT token...');
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log('✅ User signed in successfully:', {
      id: user._id,
      email: normalizedEmail,
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

    console.log('=== SIGNIN REQUEST END ===');
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
    console.log('=== FORGOT PASSWORD REQUEST ===');
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('❌ User not found for password reset:', normalizedEmail);
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
    console.log('=== RESET PASSWORD REQUEST ===');

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      console.log('❌ User not found for password reset');
      return res.status(404).json({ error: "User not found" });
    }

    const hashed = await bcrypt.hash(password, 12);
    user.password = hashed;
    await user.save();

    console.log('✅ Password reset successfully for user:', user.email);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// GET /check-username
router.get("/check-username", async (req, res) => {
  try {
    console.log('=== USERNAME CHECK REQUEST ===');
    const username = req.query.value;
    console.log('🔍 Checking username:', username);

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Normalize username
    const normalizedUsername = username.toLowerCase().trim();

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
      console.log('❌ Invalid username format:', normalizedUsername);
      return res.status(400).json({ 
        error: "Username can only contain letters, numbers, and underscores",
        available: false
      });
    }

    if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
      console.log('❌ Username length invalid:', normalizedUsername);
      return res.status(400).json({ 
        error: "Username must be between 3 and 30 characters",
        available: false
      });
    }

    const available = await User.isUsernameAvailable(normalizedUsername);

    console.log('✅ Username check result:', { username: normalizedUsername, available });

    res.status(200).json({ 
      available,
      username: normalizedUsername
    });
  } catch (err) {
    console.error("Username check error:", err);
    res.status(500).json({ 
      error: "Server error",
      available: false
    });
  }
});

module.exports = router;