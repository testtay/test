const fs = require("fs");
const path = require("path");
const home = process.env["GITHUB_WORKSPACE"];

var config = JSON.parse(
  fs.readFileSync(
    path.join(home, "build-generation", "configuration", "config.json"),
    "utf8"
  )
);

for (let i = 0; i < config.length; i++) {
    const project = config[i];
    console.log(`Project: ${project.name}`)
    for(var configuration in project.client.configurations){
        var build_configuration = project.client.configurations[configuration];
        console.log(build_configuration)
    }
}
