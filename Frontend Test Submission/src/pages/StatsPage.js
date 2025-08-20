import React, { useState } from "react";
import { getStats } from "../api";
import { Log } from "../loggingMiddleware";
import { TextField, Button, Box, Typography } from "@mui/material";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJhdGhjaGFuZHJhLnNpbW1hMDRAZ21haWwuY29tIiwiZXhwIjoxNzU1NjcwMDAxLCJpYXQiOjE3NTU2NjkxMDEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNDI1NTAyZS1mYWRkLTQzYzctOTFkNS04YzExYWMyODljYTAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaW1tYSBzYXJhdGggY2hhbmRyYSIsInN1YiI6IjZjMWEwNWNiLTc3Y2UtNGYzZS1iMDFkLTQ4ZDk0NGY1YTQ2MCJ9LCJlbWFpbCI6InNhcmF0aGNoYW5kcmEuc2ltbWEwNEBnbWFpbC5jb20iLCJuYW1lIjoic2ltbWEgc2FyYXRoIGNoYW5kcmEiLCJyb2xsTm8iOiIyMmE1MWE0NDU3IiwiYWNjZXNzQ29kZSI6IldxVXhUWCIsImNsaWVudElEIjoiNmMxYTA1Y2ItNzdjZS00ZjNlLWIwMWQtNDhkOTQ0ZjVhNDYwIiwiY2xpZW50U2VjcmV0IjoiSktxUWNCbkdqSGVGTmFNcCJ9.V3vjWfczGYVQJwrgxcEG-4_7-taoKw7MBZASqRLWw7c";

const StatsPage = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    const res = await getStats(code);
    setStats(res);
    await Log("frontend", "info", "component", `Fetched stats for: ${code}`, AUTH_TOKEN);
  };

  return (
    <Box>
      <Typography variant="h4">Short URL Stats</Typography>
      <TextField value={code} onChange={e => setCode(e.target.value)} label="Enter Shortcode" />
      <Button variant="contained" onClick={handleFetch}>Get Stats</Button>

      {stats && (
        <Box mt={3}>
          <Typography>Original: {stats.originalUrl}</Typography>
          <Typography>Created At: {stats.createdAt}</Typography>
          <Typography>Expiry: {stats.expiry}</Typography>
          <Typography>Total Clicks: {stats.clicks}</Typography>
          {stats.details && stats.details.map((c, i) => (
            <Box key={i} mt={1}>
              <Typography>- Click at {c.timestamp}, from {c.referrer}, Location: {c.location}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StatsPage;
