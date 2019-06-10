import Listr from 'listr'
import { getRuleInfo, readFile, writeFile } from '../utils'

import state from '../state'
import {
  PACKAGE_JSON_PATH,
  ESLINTRC_PATH,
  ESLINT_SOURCE_TYPES
} from '../constants'

const writeRuleToFile = async (ruleObject, fileName) => {
  const { result, error } = readFile(fileName)

  if (error) {
    return Promise.reject(error)
  }

  const [ruleKey, ruleValue] = getRuleInfo(ruleObject)

  const newContent = {
    ...result,
    rules: {
      ...result.rules,
      [ruleKey]: ruleValue
    }
  }

  // TODO: make into configurable option
  const SPACES_IN_FILE = 2
  const newFile = JSON.stringify(newContent, null, SPACES_IN_FILE)

  const { error: writeError } = writeFile(fileName, newFile)

  if (writeError) {
    return Promise.reject(error)
  }

  return Promise.resolve()
}

const getTasks = (rulesToAdd, file) => {
  const listrTasks = rulesToAdd.map(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    return {
      title: `Write ${rule} to ${file} file`,
      task: () => writeRuleToFile(ruleObject, file)
    }
  })

  return new Listr(listrTasks)
}

const getFilePath = ({ eslintSource }) => {
  if (eslintSource === ESLINT_SOURCE_TYPES.ESLINTRC) {
    return ESLINTRC_PATH
  } else if (eslintSource === ESLINT_SOURCE_TYPES.PACKAGE_JSON) {
    return PACKAGE_JSON_PATH
  } else {
    throw new Error(`
      eslintSource not set to valid property. Found: ${eslintSource}
    `)
  }
}

export default async (rulesToAdd) => {
  // Use state to choose which file to write to
  const filePathToWriteTo = getFilePath(state)

  // Display the tasks undertaken to the user
  const tasks = getTasks(rulesToAdd, filePathToWriteTo)

  // TODO: add confirmation step here
  await tasks.run()
}
