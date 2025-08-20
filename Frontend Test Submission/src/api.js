// Frontend Test Submission/src/api.js
const BASE_URL = "http://localhost:8000";

export async function createShortUrl(data) {
  const res = await fetch(`${BASE_URL}/shorturls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getStats(code) {
  const res = await fetch(`${BASE_URL}/shorturls/${code}/stats`);
  return res.json();
}
