const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Skema untuk Guide
const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true, // Default availability to true (available)
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      enum: ["Beginner", "Intermediate", "Expert"], // Example values for experience
    },
    languages: {
      type: [String],
      default: [], // Empty array if no languages are provided
    },
  },
  { timestamps: true }
); // Add createdAt and updatedAt timestamps

// Add unique validator for better validation messages
guideSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

// Export model
module.exports = mongoose.model("Guide", guideSchema);