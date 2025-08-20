const express = require("express");
const router = express.Router();
const urls = require("../models/urlStore");
const generateCode = require("../utils/generateCode");
const { Log } = require("../../Logging Middleware/loggingMiddleware");

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{3,16}$/.test(code);
}

// Create Short URL
router.post("/shorturls", async (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || !isValidUrl(url)) {
    await Log("backend", "error", "handler", "Invalid URL format");
    return res.status(400).json({ error: "Invalid URL format" });
  }
  let code = shortcode;
  if (code) {
    if (!isValidShortcode(code)) {
      await Log("backend", "error", "handler", "Invalid shortcode format");
      return res.status(400).json({ error: "Invalid shortcode format" });
    }
    if (urls[code]) {
      await Log("backend", "error", "handler", "Shortcode already exists");
      return res.status(409).json({ error: "Shortcode already exists" });
    }
  } else {
    do {
      code = generateCode();
    } while (urls[code]);
  }
  const validMins = Number.isInteger(validity) ? validity : 30;
  const expiry = new Date(Date.now() + validMins * 60 * 1000);
  urls[code] = {
    originalUrl: url,
    expiry,
    createdAt: new Date(),
    clicks: [],
  };
  await Log("backend", "info", "handler", `Short URL created: ${code}`);
  res.status(201).json({
    shortLink: `http://localhost:8000/${code}`,
    expiry: expiry.toISOString(),
  });
});

// Redirect Short URL
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const entry = urls[code];
  if (!entry) {
    await Log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }
  if (new Date() > entry.expiry) {
    await Log("backend", "error", "handler", "Link expired");
    return res.status(410).json({ error: "Link expired" });
  }
  entry.clicks.push({
    timestamp: new Date(),
    referrer: req.get("referer") || "direct",
    ip: req.ip,
    location: "IN", // Mocked, can use geoip-lite for real
  });
  await Log("backend", "info", "handler", `Redirected: ${code}`);
  res.redirect(entry.originalUrl);
});

// Get Stats for Short URL
router.get("/shorturls/:code/stats", async (req, res) => {
  const { code } = req.params;
  const entry = urls[code];
  if (!entry) {
    await Log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }
  await Log("backend", "info", "handler", `Stats fetched: ${code}`);
  res.status(200).json({
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clicks: entry.clicks.length,
    details: entry.clicks,
  });
});

module.exports = router;
