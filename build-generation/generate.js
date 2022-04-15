const fs = require("fs");
const core = require('@actions/core');
const github = require('@actions/github');

var home = process.env['GITHUB_WORKSPACE']
console.log(home)
fs.readdirSync(home).forEach((file) => {
  console.log(file);
});

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
console.log(config);
