// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { getPackageJsonRules, getEslintConfigRules } from './utils'
import { promptForOptions, parseCliArgs } from './cli'
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

export async function runReactAudit(args) {
  // Get and handle CLI options
  const cliOptions = parseCliArgs(args)

  // TODO: scan for eslint files

  // Prompt user for input based on results
  console.log('cliOptions', cliOptions)
  const options = await promptForOptions(cliOptions, recommendedRulesNotFound)
  console.log('STUFF', options)
}

/*
"react/destructuring-assignment": [
      2,
      "always"
    ],
*/
