import inquirer from 'inquirer'

export default async (options, rules) => { // eslint-disable-line
  const questions = rules.map(rule => {
    return {
      type: 'confirm',
      name: rule,
      message: `Do you want to download the '${rule}', rule?`,
      default: false,
    }
  })

  const answers = await inquirer.prompt(questions)
  return {
    [rules[0]]: answers[0]
  }

  // return {
  //   ...options,
  //   template: options.template || answers.template,
  //   git: options.git || answers.git,
  // }
}
