import fs from 'fs'
import state from '../state'
import {
  PACKAGE_JSON_PATH,
  ROOT_PATH,
  ESLINT_SOURCE_TYPES
} from '../constants'

// 1. Get eslint rules in: package.json
const getPackageJsonRules = () => {
  return fs.readFile(PACKAGE_JSON_PATH, 'utf8', (err, contents) => {
    const { eslintConfig = {} } = contents
    const { rules } = eslintConfig

    if (rules) {
      state.eslintSource = ESLINT_SOURCE_TYPES.PACKAGE_JSON
    }

    return rules || {}
  })
}

// 2. Get eslint rules in: .eslintrc
const getEslintConfigRules = () => {
  // Filter through all root level files for eslintrc
  const eslintConfigFiles = fs.readdirSync(ROOT_PATH)
    .filter(text => text.includes('.eslint'))
    .filter(text => !text.includes('ignore'))

  if (!eslintConfigFiles.length) {
    // TODO: please download one etc?
    console.warn(`
      We couldn't find a .eslintrc file in the root of your project.
    `)

    return {}
  }

  const [eslintConfigFilename] = eslintConfigFiles

  const eslintConfigFile = fs.readFileSync(eslintConfigFilename, { encoding: 'utf-8' })
  const { rules } = JSON.parse(eslintConfigFile)

  if (rules) {
    state.eslintSource = ESLINT_SOURCE_TYPES.ESLINTRC
  }

  return rules || {}
}


const getAllEslintRules = () => ({
  ...getPackageJsonRules(),
  ...getEslintConfigRules()
})

export default getAllEslintRules
