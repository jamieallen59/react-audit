// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { runCommandLinePrompt, parseCliArgs } from './cli'
import getAllEslintRules from './tasks/getAllEslintRules'
import compareRulesAgainstRecommendations from './tasks/compareRulesAgainstRecommendations'
import { getRuleInfo } from './utils'
import { RECOMMENDED_RULES } from './constants'

/*
  This file:
  1. Gets users current eslint rules
  2. Display the 'reccomended rules' they have/don't have
  3. Prompt the user to get yes/no answer for what they want to download
  4. Add the ones they want to their eslint file
*/

// 1. Gets users current eslint rules
const allEslintRules = getAllEslintRules()

const [rulesFound, rulesNotFound] = compareRulesAgainstRecommendations(
  allEslintRules, RECOMMENDED_RULES
)

// 2. Display the 'reccomended rules' they have/don't have
rulesFound.forEach(ruleObject => {
  const [rule] = getRuleInfo(ruleObject)

  console.log(`✅  Reccomended '${rule}' rule found.`)
})

rulesNotFound.forEach(ruleObject => {
  const [rule] = getRuleInfo(ruleObject)

  console.log(`🧐  Oh, we didn't find the '${rule}' rule`)
})

export async function runReactAudit(args) {
  // Get and handle CLI command/options
  const cliOptions = parseCliArgs(args)

  // 3. Prompt the user to get yes/no answer for what rules they would like
  await runCommandLinePrompt(cliOptions, rulesNotFound)
}
