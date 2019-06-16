// import store from '../store'
import { getRuleInfo } from '../utils'
import { logWarn, logInfo, logSuccess } from '../utils/log'
import lintReport from './lint'
import cssReport from './css'

const runLintReport = () => {
  const { rulesFound, rulesNotFound } = lintReport()
  logInfo('')
  logInfo('1. Linting')
  logInfo('------------------------------------------------')

  if (rulesFound.length) {
    logSuccess('Rules found:')

    rulesFound.forEach(ruleObject => {
      const [rule] = getRuleInfo(ruleObject)

      logSuccess(`✅  ${rule}`)
    })
  }

  if (rulesNotFound.length) {
    logWarn('Rules not found:')

    rulesNotFound.forEach(ruleObject => {
      const [rule] = getRuleInfo(ruleObject)

      logWarn(`🧐  ${rule}`)
    })
  }
}

const runCssReport = () => {
  const { hasCssModules } = cssReport()
  logInfo('')
  logInfo('2. CSS modules')
  logInfo('------------------------------------------------')

  if (hasCssModules) {
    logSuccess('✅  CSS modules detected')
  } else {
    logWarn('❌ No CSS modules detected')
  }
}

const runReports = () => {
  logInfo('')
  logInfo('     📈  Running react-tech-debt reports ⏳')

  runLintReport()

  runCssReport()

  logInfo('')
  logInfo('Report finished!')
  logInfo('')
}

export default runReports
