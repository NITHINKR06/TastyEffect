const mongoose = require("mongoose");
const { Schema } = mongoose;

const verificationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now } // Add a createdAt field
}, {
  timestamps: true
});

module.exports = mongoose.model("user_verifications", verificationSchema);
