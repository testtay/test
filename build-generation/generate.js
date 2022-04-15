var fs = require('fs');

var config = JSON.parse(fs.readFileSync('/configuration/config.json', 'utf8'));
console.log(config)