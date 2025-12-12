const https = require("https");
const WebSocket = require("ws");
const { loadSSL } = require("./config/ssl");

const PORT = 3001;

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WS-only client connected");

  ws.on("message", (message) => {
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

// HTTPS Server
const server = https.createServer(loadSSL());

server.listen(PORT, () => {
  console.log(`WS-only server running at wss://localhost:${PORT}`);
});
