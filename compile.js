const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');
const whitespace = 4;
const defaultName = 'ICGC-ARGO Data Dictionary';
const defaultVersion = '0.0';

const schemas = require('./schemas');
const references = require('./references');

async function promptName(versions) {
  console.log('\n');
  return new Promise(resolve =>
    inquirer
      .prompt([
        {
          message: `Dictionary Name [${chalk.yellow(defaultName)}]:`,
          name: 'name',
          type: 'string',
        },
      ])
      .then(answers => resolve(answers.name || defaultName)),
  );
}
async function promptVersion(versions) {
  console.log('\n');
  return new Promise(resolve =>
    inquirer
      .prompt([
        {
          message: `Dictionary Version [${chalk.yellow(defaultVersion)}]:`,
          name: 'version',
          type: 'string',
        },
      ])
      .then(answers => resolve(answers.version || defaultVersion)),
  );
}

async function run() {
  const name = await promptName();
  const version = await promptVersion();
  const dictionary = { name, version, references, schemas };

  fs.writeFileSync('./dictionary.json', JSON.stringify(dictionary,null,whitespace));
  console.log(dictionary);
}

run();
