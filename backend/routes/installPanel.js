const express = require("express");
const router = express.Router();
const { runScript } = require("../services/shellRunner");
const path = require("path");

router.post("/", async (req, res) => {
  const { domain, ssl, cloudflareToken } = req.body;
  const io = req.app.get("io");

  runScript(
    path.join(__dirname, "..", "services", "panelInstaller.sh"),
    [domain || "", ssl || "no", cloudflareToken || ""],
    io,
    "logs:panel"
  )
    .then(() => res.json({ status: "ok" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
