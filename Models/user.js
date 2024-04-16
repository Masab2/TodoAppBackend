const { model } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// When the Data is saved Into the Database we will be calling the Pre Method
userSchema.pre("save", async function (next) {
  var user = this;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(user.password, salt);
  user.password = hashPass;
});

module.exports = User;
