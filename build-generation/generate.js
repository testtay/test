const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const home = process.env["GITHUB_WORKSPACE"];
const action_root = path.join(home, "build-generation");

var config = JSON.parse(
  fs.readFileSync(path.join(action_root, "configuration", "config.json"))
);

for (let i = 0; i < config.length; i++) {
  const project = config[i];
  console.log(`Project: ${project.name}`);
  for (var configuration in project.client.configurations) {
    var build_configuration = project.client.configurations[configuration];
    console.log(build_configuration);

    var options = {
        name: project.name,
        branch: build_configuration.branch
    }
    var template = fs.readFileSync(path.join(action_root, "template", "template.yml"));
    const render = handlebars.compile(template, { noEscape: true })
    var output = render(options)
    console.log(output)
  }
}
