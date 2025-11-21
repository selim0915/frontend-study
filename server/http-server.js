const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = 3000;

// 정적 파일 서빙 (프로젝트 루트 기준)
app.use(express.static(path.join(__dirname, "..", "dist")));

// src 경로도 정적 서빙 (WebRTC 샘플 HTML 접근 허용)
app.use("/src", express.static(path.join(__dirname, "..", "src")));

// HTTPS 서버
const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, "..", "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "cert", "cert.pem")),
}, app);

server.listen(PORT, () => {
  console.log(`HTTPS web server running at https://localhost:${PORT}`);
});