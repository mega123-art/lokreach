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

    const {
      email,
      password,
      role,
      username, // for creator only
      brandName,
      businessContact,
      businessNiche,
      instaHandle,
      website,
      mobileNumber,
      country,
      state,
      city,
    } = req.body;

    // === Basic required checks ===
    if (!email || !password || !role) {
      return res.status(400).json({
        error: "Email, password, and role are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    if (!["creator", "brand", "admin"].includes(role)) {
      return res.status(400).json({
        error: "Invalid role specified. Must be 'creator', 'brand', or 'admin'",
      });
    }

    // === Role-based required fields ===
    if (role === "creator") {
      if (!username) {
        return res.status(400).json({
          error: "Username is required for creators",
        });
      }

      if (!mobileNumber || !instaHandle || !country || !state || !city) {
        return res.status(400).json({
          error: "Missing required fields for creator",
          required: ["mobileNumber", "instaHandle", "country", "state", "city"],
        });
      }

      // Validate username format
      const normalizedUsername = username.toLowerCase().trim();
      if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
        return res.status(400).json({
          error: "Username can only contain letters, numbers, and underscores",
        });
      }

      if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
        return res.status(400).json({
          error: "Username must be between 3 and 30 characters",
        });
      }

      // Check username availability
      const usernameTaken = await User.findOne({
        username: normalizedUsername,
      });
      if (usernameTaken) {
        return res.status(409).json({
          error: "Username already taken",
          field: "username",
        });
      }
    }

    if (role === "brand") {
      if (!brandName || !businessContact || !businessNiche) {
        return res.status(400).json({
          error: "Missing required fields for brand",
          required: ["brandName", "businessContact", "businessNiche"],
        });
      }
    }

    // Normalize inputs
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username
      ? username.toLowerCase().trim()
      : undefined;
    const normalizedInstaHandle = instaHandle
      ? instaHandle.toLowerCase().trim()
      : undefined;
    const normalizedWebsite = website
      ? website.toLowerCase().trim()
      : undefined;
    const normalizedBusinessContact = businessContact?.trim();

    // Email uniqueness check
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already in use",
        field: "email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const newUser = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role,

      // Creator fields
      username: role === "creator" ? normalizedUsername : undefined,
      mobileNumber: role === "creator" ? mobileNumber?.trim() : undefined,
      instaHandle: role === "creator" ? normalizedInstaHandle : undefined,
      country: role === "creator" ? country?.trim() : undefined,
      state: role === "creator" ? state?.trim() : undefined,
      city: role === "creator" ? city?.trim() : undefined,

      // Brand fields
      brandName: role === "brand" ? brandName?.trim() : undefined,
      businessContact: role === "brand" ? normalizedBusinessContact : undefined,
      businessNiche: role === "brand" ? businessNiche?.trim() : undefined,
      instaHandle: role === "brand" ? normalizedInstaHandle : undefined,
      website: role === "brand" ? normalizedWebsite : undefined,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username,
      },
    });

    console.log("✅ User created:", newUser._id);
    console.log("=== SIGNUP REQUEST END ===");
  } catch (err) {
    console.error("=== SIGNUP ERROR ===");
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      let errorMessage = `${field} already exists`;
      if (field === "username") errorMessage = "Username already taken";
      if (field === "email") errorMessage = "Email already in use";

      return res.status(409).json({
        error: errorMessage,
        field,
        value,
      });
    }

    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors,
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

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("❌ Admin email already exists:", normalizedEmail);
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("✅ Admin created successfully:", {
      id: newAdmin._id,
      email: normalizedEmail,
    });

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

    const normalizedEmail = email.toLowerCase().trim();

    console.log("🔍 Looking for user with email:", normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("❌ User not found:", normalizedEmail);
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
      console.log("❌ Invalid password for user:", normalizedEmail);
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

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("❌ User not found for password reset:", normalizedEmail);
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

    // Normalize username
    const normalizedUsername = username.toLowerCase().trim();

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
      console.log("❌ Invalid username format:", normalizedUsername);
      return res.status(400).json({
        error: "Username can only contain letters, numbers, and underscores",
        available: false,
      });
    }

    if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
      console.log("❌ Username length invalid:", normalizedUsername);
      return res.status(400).json({
        error: "Username must be between 3 and 30 characters",
        available: false,
      });
    }

    const available = await User.isUsernameAvailable(normalizedUsername);

    console.log("✅ Username check result:", {
      username: normalizedUsername,
      available,
    });

    res.status(200).json({
      available,
      username: normalizedUsername,
    });
  } catch (err) {
    console.error("Username check error:", err);
    res.status(500).json({
      error: "Server error",
      available: false,
    });
  }
});

module.exports = router;
