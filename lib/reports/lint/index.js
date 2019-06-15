import compareRulesAgainstRecommendations from '../../tasks/compareRulesAgainstRecommendations'
import getPackageJsonRules from './getPackageJsonRules'
import getEslintConfigRules from './getEslintConfigRules'

import { ESLINT_RECOMMENDED_RULES } from './constants'

const allEslintRules = {
  ...getPackageJsonRules(),
  ...getEslintConfigRules()
}

const [rulesFound, rulesNotFound] = compareRulesAgainstRecommendations(
  allEslintRules, ESLINT_RECOMMENDED_RULES
)

export {
  rulesFound,
  rulesNotFound
}
