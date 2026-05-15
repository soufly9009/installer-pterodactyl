const express = require("express");
const router = express.Router();
const { runScript } = require("../services/shellRunner");
const path = require("path");

router.post("/", async (req, res) => {
  const { nodeName, cloudflareToken } = req.body;
  const io = req.app.get("io");

  if (!nodeName) {
    return res.status(400).json({ error: "nodeName requis" });
  }

  runScript(
    path.join(__dirname, "..", "services", "nodeInstaller.sh"),
    [nodeName, cloudflareToken || ""],
    io,
    "logs:node"
  )
    .then(() => res.json({ status: "ok" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
