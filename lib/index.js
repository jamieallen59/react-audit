// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { parseCliArgs } from './cli'
import runReports from './reports'

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

  runReports(cliOptions)
}
