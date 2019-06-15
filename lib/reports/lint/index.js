import compareRulesAgainstRecommendations from '../../tasks/compareRulesAgainstRecommendations'
import getPackageJsonRules from './getPackageJsonRules'
import getLintConfigRules from './getLintConfigRules'

import { ESLINT_RECOMMENDED_RULES } from './constants'

const allEslintRules = {
  ...getPackageJsonRules(),
  ...getLintConfigRules()
}

const [rulesFound, rulesNotFound] = compareRulesAgainstRecommendations(
  allEslintRules, ESLINT_RECOMMENDED_RULES
)

export {
  rulesFound,
  rulesNotFound
}
