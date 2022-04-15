var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./configuration/config.js', 'utf8'));
console.log(config)