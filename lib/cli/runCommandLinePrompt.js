import inquirer from 'inquirer'
import fs from 'fs'
import Listr from 'listr'
import { green } from '../utils/textOutput'
import { getRuleInfo } from '../utils'
import state from '../state'
import {
  PACKAGE_JSON_PATH,
  ESLINTRC_PATH,
  ESLINT_SOURCE_TYPES
} from '../constants'

const askQuestions = async rules => {
  const questions = rules.map(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    return {
      type: 'confirm',
      name: rule,
      message: `Do you want to install the '${green(rule)}', rule?`,
      default: false,
    }
  })

  const answers = await inquirer.prompt(questions)

  return answers
}

const getRulesToAdd = answers => {
  console.log('raw answers', answers)
  return Object.entries(answers).reduce((accumulator, [key, value]) => {
    if (value === true) {
      return [
        ...accumulator,
        { [key]: value }
      ]
    }

    return accumulator
  }, [])
}

const writeRuleToFile = (rule, file) => {
  return new Promise((resolve, reject) => {
    const currentContent = fs.readFile(file, 'utf8', (err, contents) => {
      if (err) {
        reject(err)
      }

      return contents
    })

    const newContent = {
      ...currentContent,
      eslintConfig: {
        ...currentContent.eslintConfig,
        rules: {
          ...currentContent.eslintConfig.rules,
          'SOME NEW RULE': [2]
        }
      }
    }

    console.log('--- write new content to file --- ', newContent)

  })
}

const getTasks = (rulesToAdd, file) => {
  const listrTasks = rulesToAdd.map(rule => {
    return {
      title: `Write ${rule} to ${file} file`,
      task: () => writeRuleToFile(rule, file)
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

export default async (options, rules) => { // eslint-disable-line
  console.log('STATE', state)
  console.log('RULES', rules)

  const answers = await askQuestions(rules)
  console.log('Answers', answers)
  const rulesToAdd = getRulesToAdd(answers)
  // TODO: Returning wrong rules to add
  console.log('rulesToAdd', rulesToAdd)

  const filePathToWriteTo = getFilePath(state)
  console.log('filePathToWriteTo', filePathToWriteTo)

  const tasks = getTasks(rulesToAdd, filePathToWriteTo)
  console.log('tasks', tasks)

  // TODO: add confirmation step here

  tasks.run()
}
