const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shorturlRoutes = require("./routes/shorturl");
const logger = require("./middleware/logger");
const { setAuthToken } = require("../Logging Middleware/loggingMiddleware");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(logger("backend", "middleware"));
app.use("/", shorturlRoutes);

const PORT = 8000;

// Set your auth token here after registration/login
setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJhdGhjaGFuZHJhLnNpbW1hMDRAZ21haWwuY29tIiwiZXhwIjoxNzU1NjcwMDAxLCJpYXQiOjE3NTU2NjkxMDEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNDI1NTAyZS1mYWRkLTQzYzctOTFkNS04YzExYWMyODljYTAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaW1tYSBzYXJhdGggY2hhbmRyYSIsInN1YiI6IjZjMWEwNWNiLTc3Y2UtNGYzZS1iMDFkLTQ4ZDk0NGY1YTQ2MCJ9LCJlbWFpbCI6InNhcmF0aGNoYW5kcmEuc2ltbWEwNEBnbWFpbC5jb20iLCJuYW1lIjoic2ltbWEgc2FyYXRoIGNoYW5kcmEiLCJyb2xsTm8iOiIyMmE1MWE0NDU3IiwiYWNjZXNzQ29kZSI6IldxVXhUWCIsImNsaWVudElEIjoiNmMxYTA1Y2ItNzdjZS00ZjNlLWIwMWQtNDhkOTQ0ZjVhNDYwIiwiY2xpZW50U2VjcmV0IjoiSktxUWNCbkdqSGVGTmFNcCJ9.V3vjWfczGYVQJwrgxcEG-4_7-taoKw7MBZASqRLWw7c");

app.listen(PORT, () => {
  // No console.log as per rules
});
