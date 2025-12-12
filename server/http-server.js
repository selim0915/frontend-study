const express = require("express");
const path = require("path");
const https = require("https");
const { loadSSL } = require("./config/ssl");
const corsMiddleware = require("./config/cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Static Files
app.use(express.static(path.join(__dirname, "../dist")));

// HTTPS Server
const server = https.createServer(loadSSL(), app);

server.listen(PORT, () => {
  console.log(`HTTPS web server running at https://localhost:${PORT}`);
});