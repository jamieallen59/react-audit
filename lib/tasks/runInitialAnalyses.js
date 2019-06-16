import store from '../store'
import { updateHasWebpack, updateHasReact } from '../reducer'

import { logError } from '../utils/log'
import { readFile } from '../utils'
import { PACKAGE_JSON_PATH } from '../constants'

const checkWebpack = packageJson => {
  // check both just in case
  const { dependencies = {}, devDependencies = {} } = packageJson
  const { webpack } = dependencies
  const { webpack: devDepWebpack } = devDependencies

  const hasWebpack = webpack || devDepWebpack

  if (hasWebpack) {
    store.dispatch(updateHasWebpack())
  }
}


const checkReact = packageJson => {
  // check both just in case
  const { dependencies = {}, devDependencies = {} } = packageJson
  const { react } = dependencies
  const { react: devReact } = devDependencies

  const hasReact = react || devReact

  if (hasReact) {
    store.dispatch(updateHasReact())
  }
}

const runInitialAnalyses = () => {
  const { result, error } = readFile(PACKAGE_JSON_PATH)

  if (error) {
    logError(error)
    return
  }

  checkWebpack(result)
  checkReact(result)
}


export default runInitialAnalyses
