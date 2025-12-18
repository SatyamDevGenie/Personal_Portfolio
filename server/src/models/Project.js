const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: String,
    repo: String,
    stack: { type: String, default: "Full-stack" }
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);






