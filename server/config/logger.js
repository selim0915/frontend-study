const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../../log");
const LOG_FILE_PATH = path.join(LOG_DIR, "client-logs.txt");

function logClientMessage(req, res) {
  const { level, message, timestamp } = req.body;
  const logMessage = `[${timestamp || new Date().toISOString()}] [${level}] ${message}\n`;

  // 로그 경로 확인
  if (!fs.existsSync(LOG_DIR)) {
    try {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    } catch (e) {
      console.error("Failed to create log dir:", e);
    }
  }

  fs.appendFile(LOG_FILE_PATH, logMessage, (err) => {
    if (err) console.error("Log write failed:", err);
  });

  res.status(200).send("Logged");
}

module.exports = { logClientMessage };
