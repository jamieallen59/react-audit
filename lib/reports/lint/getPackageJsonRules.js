import state from '../../state'
import { readFile } from '../../utils'
import { green, orange } from '../../utils/textOutput'

import {
  PACKAGE_JSON_PATH,
  ESLINT_SOURCE_TYPES
} from './constants'

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

export default getPackageJsonRules
