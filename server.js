const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// webtrc 폴더를 정적 파일 제공
app.use(express.static(path.join(__dirname, "webtrc")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
