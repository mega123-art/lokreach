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
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["creator", "brand", "admin"],
      required: true,
    },

    // Brand-specific fields
    brandName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "brand";
      },
    },
    businessContact: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "brand";
      },
    },
    businessNiche: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "brand";
      },
    },
    instaHandle: {
      type: String,
      trim: true,
      lowercase: true,
      required: function () {
        return this.role === "creator";
      },
    },
    website: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Creator-specific fields
    mobileNumber: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "creator";
      },
    },
    country: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "creator";
      },
    },
    state: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "creator";
      },
    },
    city: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "creator";
      },
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      required: function () {
        return this.role === "creator";
      },
      validate: {
        validator: function (v) {
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
  }
);

// Pre-save normalization
userSchema.pre("save", function (next) {
  if (this.email) this.email = this.email.toLowerCase().trim();
  if (this.username) this.username = this.username.toLowerCase().trim();
  if (this.instaHandle)
    this.instaHandle = this.instaHandle.toLowerCase().trim();
  if (this.website) this.website = this.website.toLowerCase().trim();
  if (this.brandName) this.brandName = this.brandName.trim();
  if (this.businessContact) this.businessContact = this.businessContact.trim();
  if (this.businessNiche) this.businessNiche = this.businessNiche.trim();
  if (this.mobileNumber) this.mobileNumber = this.mobileNumber.trim();
  if (this.country) this.country = this.country.trim();
  if (this.state) this.state = this.state.trim();
  if (this.city) this.city = this.city.trim();
  next();
});

// Static method for username availability
userSchema.statics.isUsernameAvailable = async function (
  username,
  excludeUserId = null
) {
  if (!username) return false;
  const query = { username: username.toLowerCase().trim() };
  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }
  const existingUser = await this.findOne(query);
  return !existingUser;
};

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
