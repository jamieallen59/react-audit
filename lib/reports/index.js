import { getRuleInfo } from '../utils'
import { logWarn, logInfo, logSuccess } from '../utils/log'
import { rulesFound, rulesNotFound } from './lint'

const runLintReport = () => {
  logInfo(' 1. lint report')
  logInfo('------------------------------------------------')

  rulesFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    logSuccess(` ✅  Reccomended '${rule}' rule found.`)
  })

  rulesNotFound.forEach(ruleObject => {
    const [rule] = getRuleInfo(ruleObject)

    logWarn(` 🧐  Oh, we didn't find the '${rule}' rule`)
  })
}

const runCssReport = () => {
  logInfo(' 2. CSS modules report')
  logInfo('------------------------------------------------')

}

const runReports = () => {
  logInfo('')
  logInfo(' 📈  Running react-tech-debt reports ⏳ ')
  logInfo('')

  runLintReport()

  runCssReport()

  logInfo('')
  logInfo(' Report finished!')
  logInfo('')
}

export default runReports
