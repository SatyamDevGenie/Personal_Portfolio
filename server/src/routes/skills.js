const router = require("express").Router();
const Skill = require("../models/Skill");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", async (_req, res) => {
  const skills = await Skill.find().sort({ level: -1 });
  res.json(skills);
});

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { name, level, category } = req.body;
  if (!name || typeof level !== "number") {
    return res.status(400).json({ error: "Name and level required" });
  }
  const created = await Skill.create({ name, level, category });
  res.status(201).json(created);
});

router.patch("/:id", verifyToken, isAdmin, async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;



