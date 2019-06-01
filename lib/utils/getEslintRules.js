import fs from 'fs'

import { PACKAGE_JSON_PATH, ROOT_PATH } from '../constants'

// Helpers
const includesEslint = text => text.includes('.eslint')
const removeEslintIgnore = text => !text.includes('ignore')


// Get all eslint config rules in package.json
export const getPackageJsonRules = () => {
  return fs.readFile(PACKAGE_JSON_PATH, 'utf8', (err, contents) => {
    // get package json rules
    const { eslintConfig = {} } = contents
    const { rules: packageJsonRules } = eslintConfig

    return packageJsonRules
  })
}

// Get all eslint config rules in .eslintrc
export const getEslintConfigRules = () => {
  // Filter through all root level files for eslintrc
  const eslintConfigFiles = fs.readdirSync(ROOT_PATH)
    .filter(includesEslint)
    .filter(removeEslintIgnore)

  if (eslintConfigFiles.length > 1) {
    console.warn(`
      There should be only one eslintrc specified at a root level.
      We found these: ${eslintConfigFiles}
    `)

    return
  }

  const [eslintConfigFilename] = eslintConfigFiles

  // Get main config rules
  const eslintConfigFile = fs.readFileSync(eslintConfigFilename, { encoding: 'utf-8' })
  const { rules } = JSON.parse(eslintConfigFile)

  return rules
}
