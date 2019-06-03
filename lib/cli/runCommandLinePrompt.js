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

export default async (options, rules) => { // eslint-disable-line

  const answers = await askQuestions(rules)
  console.log('STATE', state)

  Object.entries(answers).forEach(async ([key, value]) => {
    if (value) {
      console.log('WRITE TO FILE', key)
    }
  })

  console.log('Answers', answers)

}
