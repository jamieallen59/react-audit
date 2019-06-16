// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import store from './store'

import { parseCliArgs } from './cli'
import runInitialAnalyses from './tasks/runInitialAnalyses'
import runReports from './reports'
import { logWarn } from './utils/log'
import { PROJECT_NAME } from './constants'

/*
  1. Gets users command line input
  2. Runs all reports
*/
process.on('unhandledRejection', err => {
  throw err
})

export function runReactAudit(args) {
  // Get and handle CLI command/options
  const cliOptions = parseCliArgs(args)

  runInitialAnalyses()

  const { hasReact } = store.getState()

  if (!hasReact) {
    logWarn(`
      React is not detected in this project. ${PROJECT_NAME}
      is only supposed to be used against react projects.
    `)

    return
  }

  runReports(cliOptions)
}
