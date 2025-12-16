const { Schema, model } = require("mongoose");

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, default: "General" }
  },
  { timestamps: true }
);

module.exports = model("Skill", skillSchema);



