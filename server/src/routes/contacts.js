const router = require("express").Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

console.log("Initializing email transporter...");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_EMAIL_PASSWORD exists:", !!process.env.ADMIN_EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

// Verify connection
transporter.verify((err, success) => {
  if (err) {
    console.error("Email transporter verification failed:", err);
  } else {
    console.log("Email transporter verified successfully");
  }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const created = await Contact.create({ name, email, message });
    console.log("Contact saved to database:", created);

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New contact from ${name}`,
      text: `You received a new message from ${name} <${email}>:\n\n${message}`,
      html: `<p>You received a new message from <strong>${name}</strong> &lt;${email}&gt;:</p><p>${message}</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending contact email:", err);
      } else {
        console.log("Contact email sent successfully:", info.response);
      }
    });

    res.status(201).json({ success: true, message: "Message received", data: created });
  } catch (err) {
    console.error("Error in contacts endpoint:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;



