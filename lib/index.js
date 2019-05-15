
const packageJson = require('./package.json');
const fs = require('fs');

const includesEslint = text => text.includes('.eslint');
const removeEslintIgnore = text => !text.includes('ignore');

const eslintConfigFiles = fs.readdirSync('./')
  .filter(includesEslint)
  .filter(removeEslintIgnore);

if (eslintConfigFiles.length > 1) {
    throw new Error(`
      There should be only one eslintrc specified at a root level.
      We found these: ${eslintConfigFiles}
    `);
}

const [eslintConfigFilename] = eslintConfigFiles;

// Get main config rules
const eslintConfigFile = fs.readFileSync(eslintConfigFilename, { encoding: 'utf-8' });
const { rules } = JSON.parse(eslintConfigFile)

// get package json rules
const { eslintConfig = {} } = packageJson
const { rules: packageJsonRules } = eslintConfig

const allRules = {
  ...rules,
  ...packageJsonRules
}

console.log('allRules', allRules)
