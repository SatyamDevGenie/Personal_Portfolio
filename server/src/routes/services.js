const router = require("express").Router();
const Service = require("../models/Service");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", async (_req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }
  const created = await Service.create({ title, description, category });
  res.status(201).json(created);
});

router.patch("/:id", verifyToken, isAdmin, async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;






