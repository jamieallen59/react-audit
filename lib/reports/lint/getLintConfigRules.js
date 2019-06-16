import fs from 'fs'
import store from '../../store'
import { updateLintSource } from '../../reducer'
import { readFile } from '../../utils'
import { logWarn } from '../../utils/log'

import { ROOT_PATH } from '../../constants'
import { ESLINT_SOURCE_TYPES } from './constants'

// Get lint rules in: .eslintrc
const getLintConfigRules = () => {
  // Filter through all root level files for eslintrc
  const eslintConfigFiles = fs.readdirSync(ROOT_PATH)
    .filter(text => text.includes('.eslint'))
    .filter(text => !text.includes('ignore'))

  if (!eslintConfigFiles.length) {
    logWarn(`
      We couldn't find an .eslintrc file in the root of your project.
    `)

    return {}
  }

  const [eslintConfigFilename] = eslintConfigFiles

  const { result: { rules } = {} } = readFile(eslintConfigFilename)

  if (rules) {
    store.dispatch(updateLintSource(ESLINT_SOURCE_TYPES.ESLINTRC))
  }

  return rules || {}
}

export default getLintConfigRules
