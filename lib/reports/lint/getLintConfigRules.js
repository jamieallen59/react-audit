import fs from 'fs'
import state from '../../state'
import { readFile } from '../../utils'
import { logWarn, logError } from '../../utils/log'

import { ROOT_PATH } from '../../constants'
import { ESLINT_SOURCE_TYPES } from './constants'

// 2. Get eslint rules in: .eslintrc
const getEslintConfigRules = () => {
  // Filter through all root level files for eslintrc
  const eslintConfigFiles = fs.readdirSync(ROOT_PATH)
    .filter(text => text.includes('.eslint'))
    .filter(text => !text.includes('ignore'))

  if (!eslintConfigFiles.length) {
    // TODO: please download one etc?
    logWarn(`
      We couldn't find an .eslintrc file in the root of your project.
    `)

    return {}
  }

  const [eslintConfigFilename] = eslintConfigFiles
  const { result, error } = readFile(eslintConfigFilename)

  if (error) {
    logError(error)
    return
  }

  const { rules } = result

  if (rules) {
    state.eslintSource = ESLINT_SOURCE_TYPES.ESLINTRC
  }

  return rules || {}
}

export default getEslintConfigRules