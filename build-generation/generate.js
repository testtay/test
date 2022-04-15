const path = require("path");
const fs = require("fs-extra");
const git = require("simple-git");
const handlebars = require("handlebars");
const home = process.env["GITHUB_WORKSPACE"] || "../";
const action_root = path.join(home, "build-generation");

(async () => {
  var config = JSON.parse(
    fs.readFileSync(path.join(action_root, "configuration", "config.json"))
  );

  for (let i = 0; i < config.length; i++) {
    const project = config[i];
    console.log(`Generating Build: ${project.name}`);

    let base_output_path = path.join(home, "output", `${project.name}`);

    for (var configuration in project.client.configurations) {
      var build_configuration = project.client.configurations[configuration];

      var options = {
        name: project.name,
        branch: build_configuration.branch,
        build_workflow: "./dh-build",
        build_environment: configuration,
      };

      console.log(options);

      var template = fs
        .readFileSync(path.join(action_root, "template", "template.yml"))
        .toString();

      const render = handlebars.compile(template, { noEscape: true });
      var output = render(options);

      let workflow_output_path = path.join(
        base_output_path,
        ".github",
        "workflows",
        `${project.name}-${configuration}.yml`
      );
      let build_output_path = path.join(
        base_output_path,
        ".github",
        "workflows",
        "dh-build",
        "action.yml"
      );

      //write the workflow to disk
      fs.mkdirSync(path.dirname(workflow_output_path), { recursive: true });
      fs.writeFileSync(workflow_output_path, output);

      //write dh-build to disk
      fs.mkdirSync(path.dirname(build_output_path), { recursive: true });
      fs.copyFileSync(
        path.join(action_root, "workflows", "build", `${project.build}.yml`),
        build_output_path
      );
    }

    //clone project and commit files
    var repo_path = path.join(home, "repositories", project.name);
    if (fs.existsSync(repo_path)) {
      fs.rmSync(repo_path, { recursive: true });
    }
    fs.mkdirSync(repo_path, { recursive: true });

    console.log(`Cloning Repository To: ${repo_path}`);
    await git().clone(project.repository, repo_path);

    console.log("Copying Build Files");
    fs.copySync(base_output_path, repo_path, { recursive: true });

    await git()
      .add('.')
      .commit("updating build scripts")
      .addRemote("origin", "master")
      .push(["-u", "origin", "master"]);
    console.log("Done")
  }
})();
