// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import arg from 'arg'
import inquirer from 'inquirer'

import { getPackageJsonRules, getEslintConfigRules } from './utils'
import getRulesToLookFor from './recommendedRules'

const packageJsonRules = getPackageJsonRules()
const eslintConfigRules = getEslintConfigRules()

const allFoundRules = {
  ...eslintConfigRules,
  ...packageJsonRules
}

const rulesToLookFor = getRulesToLookFor(allFoundRules)

const recommendedRulesFound = []
const recommendedRulesNotFound = []

rulesToLookFor.forEach(({ rule, key }) => {
  if (rule) {
    recommendedRulesFound.push(key)
  } else {
    recommendedRulesNotFound.push(key)
  }
})

recommendedRulesFound.forEach(rule => {
  console.log(`✅  Reccomended '${rule}' rule found.`)
})

recommendedRulesNotFound.forEach(rule => {
  console.log(`🧐  Oh, we didn't find the '${rule}' rule`)
})

const parseArgumentsIntoOptions = rawArgs => {
  const commandLineArgs = {
    // Types
    '--yes': Boolean,
    // Aliases
    '-y': '--yes',
  }

  //https://www.npmjs.com/package/arg#argv
  const args = arg(commandLineArgs, {
    argv: rawArgs.slice(2),
  })

  return {
    skipPrompts: args['--yes'] || false,
  }
}

const promptForMissingOptions = async options => { // eslint-disable-line
  const defaultTemplate = 'JavaScript'
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    }
  }

  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate,
    })
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  }
}

export async function runReactAudit(args) {
  console.log('arguments: ', args)
  // console.log('current directory: ', __dirname)

  // Get and handle CLI options
  const cliOptions = parseArgumentsIntoOptions(args)

  // TODO: scan for eslint files
  // ...

  // Prompt user for input based on results
  // const options = await promptForMissingOptions(cliOptions)
  console.log(cliOptions)
}

/*
"react/destructuring-assignment": [
      2,
      "always"
    ],
*/
