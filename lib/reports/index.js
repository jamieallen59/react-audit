import { getRuleInfo } from '../utils'
import { logWarn, logInfo, logSuccess } from '../utils/log'

import { rulesFound, rulesNotFound } from './lint'

const runLintReport = () => {
  logInfo('Running eslint report.')

  rulesFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    logSuccess(`✅  Reccomended '${rule}' rule found.`)
  })

  rulesNotFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    logWarn(`🧐  Oh, we didn't find the '${rule}' rule`)
  })
}

const runReports = async () => {
  logInfo('Running tech debt reports.')

  runLintReport()
}

export default runReports
