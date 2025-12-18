const router = require("express").Router();
const Project = require("../models/Project");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { name, description, url, repo, stack } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description required" });
  }
  const created = await Project.create({ name, description, url, repo, stack });
  res.status(201).json(created);
});

router.patch("/:id", verifyToken, isAdmin, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;






