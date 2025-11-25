const fs = require("fs");
const path = require("path");

function loadSSL(options = {}) {
  const defaultKey = path.join(__dirname, "..", "cert", "key.pem");
  const defaultCert = path.join(__dirname, "..", "cert", "cert.pem");
  const keyPath = options.keyPath || process.env.SSL_KEY || defaultKey;
  const certPath = options.certPath || process.env.SSL_CERT || defaultCert;

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new Error(
      `SSL certificate files not found.\nExpected key: ${keyPath}\nExpected cert: ${certPath}`
    );
  }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
}

module.exports = { loadSSL };
