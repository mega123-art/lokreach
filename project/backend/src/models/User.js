// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["creator", "brand", "admin"],
      required: true,
    },
    brandName: {
      type: String,
      trim: true,
      required: true,
    },

    businessContact: {
      type: String,
      trim: true,
      required: true,
    },

    businessNiche: {
      type: String,
      trim: true,
      required: true,
    },

    instaHandle: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },

    website: {
      type: String,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
      required: true,
    },

    country: {
      type: String,
      trim: true,
      required: true,
    },

    state: {
      type: String,
      trim: true,
      required: true,
    },

    city: {
      type: String,
      trim: true,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true, // This allows null values but ensures uniqueness when present
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Only validate username format if it's provided
          if (!v) return true;
          return /^[a-zA-Z0-9_]+$/.test(v);
        },
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
    
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    timestamps: true,
    // Add indexes for better performance
    indexes: [{ email: 1 }, { username: 1 }, { role: 1 }],
  }
);

// Pre-save middleware to handle username normalization
userSchema.pre("save", function (next) {
  // Normalize username to lowercase if it exists
  if (this.username) {
    this.username = this.username.toLowerCase().trim();
  }

  // Normalize email
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }

  // Normalize contact email

  if (this.businessContact) this.businessContact = this.businessContact.trim();
  if (this.brandName) this.brandName = this.brandName.trim();
  if (this.businessNiche) this.businessNiche = this.businessNiche.trim();
  if (this.instaHandle)
    this.instaHandle = this.instaHandle.toLowerCase().trim();
  if (this.website) this.website = this.website.toLowerCase().trim();

  if (this.mobileNumber) this.mobileNumber = this.mobileNumber.trim();
  if (this.country) this.country = this.country.trim();
  if (this.state) this.state = this.state.trim();
  if (this.city) this.city = this.city.trim();

  next();
});

// Static method to check username availability
userSchema.statics.isUsernameAvailable = async function (
  username,
  excludeUserId = null
) {
  if (!username) return false;

  const normalizedUsername = username.toLowerCase().trim();
  const query = { username: normalizedUsername };

  // Exclude current user if updating
  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }

  const existingUser = await this.findOne(query);
  return !existingUser;
};

module.exports = mongoose.model("User", userSchema);
