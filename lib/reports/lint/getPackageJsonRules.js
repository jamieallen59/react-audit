import state from '../../state'
import { readFile } from '../../utils'
import { logError } from '../../utils/log'

import {
  PACKAGE_JSON_PATH,
  ESLINT_SOURCE_TYPES
} from './constants'

// 1. Get eslint rules in: package.json
const getPackageJsonRules = () => {
  const { result, error } = readFile(PACKAGE_JSON_PATH)

  if (error) {
    logError(error)
    return
  }

  const { eslintConfig = {} } = result
  const { rules } = eslintConfig

  if (rules) {
    state.eslintSource = ESLINT_SOURCE_TYPES.PACKAGE_JSON
  }

  return rules || {}
}

export default getPackageJsonRules
