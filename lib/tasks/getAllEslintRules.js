import fs from 'fs'
import state from '../state'
import { readFile } from '../utils'
import { green, orange } from '../utils/textOutput'

import {
  PACKAGE_JSON_PATH,
  ROOT_PATH,
  ESLINT_SOURCE_TYPES
} from '../constants'

// 1. Get eslint rules in: package.json
const getPackageJsonRules = () => {
  const { result, error } = readFile(PACKAGE_JSON_PATH)

  if (error) {
    console.log(orange(error))
    return
  }

  console.log(green('package.json file found'))

  const { eslintConfig = {} } = result
  const { rules } = eslintConfig

  if (rules) {
    console.log(green('package.json lint rules found'))
    state.eslintSource = ESLINT_SOURCE_TYPES.PACKAGE_JSON
  }

  return rules || {}
}

// 2. Get eslint rules in: .eslintrc
const getEslintConfigRules = () => {
  // Filter through all root level files for eslintrc
  const eslintConfigFiles = fs.readdirSync(ROOT_PATH)
    .filter(text => text.includes('.eslint'))
    .filter(text => !text.includes('ignore'))

  if (!eslintConfigFiles.length) {
    // TODO: please download one etc?
    console.log(orange(`
      We couldn't find an .eslintrc file in the root of your project.
    `))

    return {}
  }

  const [eslintConfigFilename] = eslintConfigFiles

  const { result, error } = readFile(eslintConfigFilename)

  if (error) {
    console.log(orange(error))
    return
  }

  console.log(green('.eslintrc.json found'))

  const { rules } = result

  if (rules) {
    console.log(green('.eslintrc.json lint rules found'))
    state.eslintSource = ESLINT_SOURCE_TYPES.ESLINTRC
  }

  return rules || {}
}


const getAllEslintRules = () => ({
  ...getPackageJsonRules(),
  ...getEslintConfigRules()
})

export default getAllEslintRules
