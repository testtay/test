const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const github = require("@actions/github");
const home = process.env["GITHUB_WORKSPACE"];

var config = JSON.parse(
  fs.readFileSync(
    path.join(home, "build-generation", "configuration", "config.json"),
    "utf8"
  )
);

console.log(config);
