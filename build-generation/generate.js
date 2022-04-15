var fs = require("fs");

fs.readdirSync("/").forEach((file) => {
  console.log(file);
});

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
console.log(config);
