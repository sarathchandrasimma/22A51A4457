import React, { useState } from "react";
import { createShortUrl } from "../api";
import { Log } from "../loggingMiddleware";
import { TextField, Button, Box, Typography } from "@mui/material";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJhdGhjaGFuZHJhLnNpbW1hMDRAZ21haWwuY29tIiwiZXhwIjoxNzU1NjcwMDAxLCJpYXQiOjE3NTU2NjkxMDEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNDI1NTAyZS1mYWRkLTQzYzctOTFkNS04YzExYWMyODljYTAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaW1tYSBzYXJhdGggY2hhbmRyYSIsInN1YiI6IjZjMWEwNWNiLTc3Y2UtNGYzZS1iMDFkLTQ4ZDk0NGY1YTQ2MCJ9LCJlbWFpbCI6InNhcmF0aGNoYW5kcmEuc2ltbWEwNEBnbWFpbC5jb20iLCJuYW1lIjoic2ltbWEgc2FyYXRoIGNoYW5kcmEiLCJyb2xsTm8iOiIyMmE1MWE0NDU3IiwiYWNjZXNzQ29kZSI6IldxVXhUWCIsImNsaWVudElEIjoiNmMxYTA1Y2ItNzdjZS00ZjNlLWIwMWQtNDhkOTQ0ZjVhNDYwIiwiY2xpZW50U2VjcmV0IjoiSktxUWNCbkdqSGVGTmFNcCJ9.V3vjWfczGYVQJwrgxcEG-4_7-taoKw7MBZASqRLWw7c";

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);
  const [form, setForm] = useState([{ url: "", validity: 30, shortcode: "" }]);

  const handleChange = (i, e) => {
    const newForm = [...form];
    newForm[i][e.target.name] = e.target.value;
    setForm(newForm);
  };

  const addForm = () => {
    if (form.length < 5) setForm([...form, { url: "", validity: 30, shortcode: "" }]);
  };

  const handleSubmit = async () => {
    const responses = [];
    for (let f of form) {
      if (!/^https?:\/\/.+/.test(f.url)) {
        await Log("frontend", "error", "component", "Invalid URL", AUTH_TOKEN);
        alert("Invalid URL");
        return;
      }
      if (f.validity && isNaN(Number(f.validity))) {
        await Log("frontend", "error", "component", "Invalid validity", AUTH_TOKEN);
        alert("Validity must be a number");
        return;
      }
      const res = await createShortUrl({
        url: f.url,
        validity: f.validity ? parseInt(f.validity) : undefined,
        shortcode: f.shortcode || undefined,
      });
      responses.push(res);
      await Log("frontend", "info", "component", `Shortened: ${f.url}`, AUTH_TOKEN);
    }
    setUrls(responses);
  };

  return (
    <Box>
      <Typography variant="h4">URL Shortener</Typography>
      {form.map((f, i) => (
        <Box key={i} display="flex" gap={2} mt={2}>
          <TextField name="url" label="Long URL" value={f.url} onChange={e => handleChange(i, e)} fullWidth />
          <TextField name="validity" label="Validity (min)" type="number" value={f.validity} onChange={e => handleChange(i, e)} />
          <TextField name="shortcode" label="Shortcode (optional)" value={f.shortcode} onChange={e => handleChange(i, e)} />
        </Box>
      ))}
      <Button onClick={addForm}>+ Add Another</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Shorten</Button>

      <Box mt={3}>
        {urls.map((u, idx) => (
          <Box key={idx}>
            <Typography>Short Link: {u.shortLink}</Typography>
            <Typography>Expires: {u.expiry}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShortenerPage;
