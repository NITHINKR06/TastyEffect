const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
});
module.exports = mongoose.model("admin_data", adminSchema);
