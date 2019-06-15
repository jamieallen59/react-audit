// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { parseCliArgs } from './cli'
import runReports from './reports'

/*
  This file:
  1. Gets users command line input
  2. Run reports
  2. Display the 'reccomended rules' they have/don't have
  3. Prompt the user to get yes/no answer for what they want to download
  4. Add the ones they want to their eslint file
*/

process.on('unhandledRejection', err => {
  throw err
})

export async function runReactAudit(args) {
  // Get and handle CLI command/options
  const cliOptions = parseCliArgs(args)
  console.log('cliOptions', cliOptions)
  await runReports(cliOptions)
}
