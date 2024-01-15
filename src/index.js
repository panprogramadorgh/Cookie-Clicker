const express = require("express");
const server = express();

server.use("/", express.static("./public"));
server.get("/", (req, res) => {
  res.redirect("./index.html");
});

const PORT = 80;
const adress = "192.168.1.3";
server.listen(PORT, () => {
  console.log(`Server listening at http://${adress}:${PORT}`);
});
