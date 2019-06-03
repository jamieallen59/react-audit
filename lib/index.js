// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { getPackageJsonRules, getEslintConfigRules } from './utils'
import { runCommandLinePrompt, parseCliArgs } from './cli'
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
  try {
    // Get and handle CLI options
    const cliOptions = parseCliArgs(args)

    // Prompt user for input based on results
    await runCommandLinePrompt(cliOptions, recommendedRulesNotFound)
  } catch (error) {
    console.log('Error', error)
  }

}
