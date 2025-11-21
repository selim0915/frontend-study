const https = require("https");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = 3001;

// 인증서 로드 (프로젝트 루트 기준으로 수정)
const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, "..", "cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "cert/cert.pem"))
});

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