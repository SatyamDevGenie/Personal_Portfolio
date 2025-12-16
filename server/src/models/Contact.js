const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model("Contact", contactSchema);



