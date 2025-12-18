const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Service" }
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);






