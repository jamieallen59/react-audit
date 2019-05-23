// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
// const packageJson = require(`${__dirname}/package.json`);
// const fs = require('fs');
//
// // Helpers
// const includesEslint = text => text.includes('.eslint');
// const removeEslintIgnore = text => !text.includes('ignore');
//
// const eslintConfigFiles = fs.readdirSync(__dirname)
//   .filter(includesEslint)
//   .filter(removeEslintIgnore);
//
// if (eslintConfigFiles.length > 1) {
//     throw new Error(`
//       There should be only one eslintrc specified at a root level.
//       We found these: ${eslintConfigFiles}
//     `);
// }
//
// const [eslintConfigFilename] = eslintConfigFiles;
//
// // Get main config rules
// const eslintConfigFile = fs.readFileSync(eslintConfigFilename, { encoding: 'utf-8' });
// const { rules } = JSON.parse(eslintConfigFile);
//
// // get package json rules
// const { eslintConfig = {} } = packageJson;
// const { rules: packageJsonRules } = eslintConfig;
//
// const allRules = {
//     ...rules,
//     ...packageJsonRules
// };
//
// const TEST_KEY = 'stuff';
// const REACT_DESCTRUCTURING_ASSIGNMENT_KEY = 'react/destructuring-assignment';
//
// const ruleOne = {
//     rule: allRules[REACT_DESCTRUCTURING_ASSIGNMENT_KEY],
//     key: REACT_DESCTRUCTURING_ASSIGNMENT_KEY
// };
// const ruleTwo = {
//     rule: allRules[TEST_KEY],
//     key: TEST_KEY
// };
//
// const rulesToLookFor = [
//     ruleOne,
//     ruleTwo
// ];
//
// const recommendedRules = [];
// const notFoundRules = [];
//
// rulesToLookFor.forEach(({ rule, key }) => {
//     if (rule) {
//         recommendedRules.push(key);
//     } else {
//         notFoundRules.push(key);
//     }
// });
//
// recommendedRules.forEach(rule => {
//     console.log(`✅  Reccomended '${rule}' rule found.`);
// });
//
// notFoundRules.forEach(rule => {
//     console.log(`🧐  Oh, we didn't find the '${rule}' rule`);
// });
import arg from 'arg';

const parseArgumentsIntoOptions = rawArgs => {
  const commandLineArgs = {
    // Types
    '--yes': Boolean,
    // Aliases
    '-y': '--yes',
  }

  //https://www.npmjs.com/package/arg#argv
  const args = arg(commandLineArgs, {
    argv: rawArgs.slice(2),
  })

  return {
    skipPrompts: args['--yes'] || false,
  }
}

export function cli(args) {
  console.log('arguments: ', args)
  console.log('current directory: ', __dirname)

  const cliOptions = parseArgumentsIntoOptions(args)

  console.log(options)
}

/*
"react/destructuring-assignment": [
      2,
      "always"
    ],
*/
