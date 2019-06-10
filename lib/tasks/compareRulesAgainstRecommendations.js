import { getRuleInfo } from '../utils'

const compareRulesAgainstRecommendations = (allEslintRules, recommendedRules) => {
  const recommendedRulesFound = []
  const recommendedRulesNotFound = []

  recommendedRules.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    const hasRule = allEslintRules[rule]

    if (hasRule) {
      recommendedRulesFound.push(ruleObject)
    } else {
      recommendedRulesNotFound.push(ruleObject)
    }
  })

  return [recommendedRulesFound, recommendedRulesNotFound]
}

export default compareRulesAgainstRecommendations
