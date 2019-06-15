import { getRuleInfo } from '../utils'

import { rulesFound, rulesNotFound } from './lint'

const runReports = async () => {
  rulesFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    console.log(`✅  Reccomended '${rule}' rule found.`)
  })

  rulesNotFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    console.log(`🧐  Oh, we didn't find the '${rule}' rule`)
  })
}

export default runReports
