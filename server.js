const express = require("express");
var path = require("path");
// const { fs } = require("memfs");
// const requireFromString = require("require-from-string");
const Server = require("./build/server");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  // const contents = fs.readFileSync("./build/server.js", "utf8");
  // const contents = fs.readFileSync('/build/server.js', 'utf8');
  // const Server = requireFromString(contents, "server.js");
  console.log(Server)
  Server.default(req, res);
});

app.listen(5555);
