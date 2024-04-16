const { model } = require("mongoose");
const mongoose = require("mongoose");
const user = require("./user");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user.modelName,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const todoUser = mongoose.model("Todo", todoSchema);

module.exports = todoUser;
