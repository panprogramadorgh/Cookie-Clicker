const express = require("express");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const server = express();

server.use("/", express.static("./public"));
server.get("/", (req, res) => {
  res.redirect("./index.html");
});
server.use(notFoundHandler);
server.use(errorHandler);

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});
