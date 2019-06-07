import inquirer from 'inquirer'
import { green } from '../utils/textOutput'
import state from '../state'

const askQuestions = async rules => {
  const questions = rules.map(rule => {
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

const getPackagesToDownload = answers => {
  return Object.entries(answers).reduce((accumulator, [key, value]) => {
    if (value === true) {
      return [
        ...accumulator,
        key
      ]
    }

    return accumulator
  }, [])
}

export default async (options, rules) => { // eslint-disable-line
  console.log('STATE', state)
  const answers = await askQuestions(rules)
  console.log('Answers', answers)
  const packagesToDownload = getPackagesToDownload(answers)
  // TODO: add confirmation step here
  console.log('packagesToDownload', packagesToDownload)


}
