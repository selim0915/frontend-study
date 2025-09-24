const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const WebSocket = require("ws");

const app = express();
const PORT = 3000;

// 정적파일 서빙
app.use(express.static(path.join(__dirname, "public")));
app.use("/src", express.static(path.join(__dirname, "src")));

// SSL 인증서 경로
const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, "cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert/cert.pem"))
}, app);

// WebSocket (WebRTC 시그널링)
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  console.log("Client connected");
  
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

// 서버 실행
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
