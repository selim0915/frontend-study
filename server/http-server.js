const express = require("express");
const path = require("path");
const https = require("https");
const { loadSSL } = require("../config/ssl");

const app = express();
const PORT = 3000;

// HTTPS 서버 생성
const server = https.createServer(loadSSL(), app);

// 정적 파일 서빙 (프로젝트 루트 기준)
app.use(express.static(path.join(__dirname, "../dist")));

server.listen(PORT, () => {
  console.log(`HTTPS web server running at https://localhost:${PORT}`);
});