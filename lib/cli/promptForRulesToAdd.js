import inquirer from 'inquirer'
import { green } from '../utils/textOutput'
import { getRuleInfo } from '../utils'

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

export default async (options, rules) => {
  // Get answers about what you want to download
  const answers = await askQuestions(rules)

  // User the answers to get the rules needed
  const rulesToAdd = getRulesToAdd(answers)

  return rulesToAdd
}
