const shell = require('shelljs');
const amplify = require('./amplify-headless-init-payload.json');
const cmd = 'amplify init --amplify "' + JSON.stringify(amplify.amplify).replaceAll('"', '\\"') + '" --providers "' + JSON.stringify(amplify.providers).replaceAll('"', '\\"') + '" --yes';
console.log(cmd);
if (shell.exec(cmd).code !== 0) {
    shell.echo('Error amplify init');
    shell.exit(1);
}
