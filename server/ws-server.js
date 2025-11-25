const https = require("https");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const { loadSSL } = require("../config/ssl");

const PORT = 3001;

// HTTPS 서버 생성
const server = https.createServer(loadSSL());

// WebSocket 전용 서버 (정적 파일 서빙 없음)
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WS-only client connected");

  ws.on("message", (message) => {
    // 브로드캐스트
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("WS-only client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`WS-only server running at wss://localhost:${PORT}`);
});
