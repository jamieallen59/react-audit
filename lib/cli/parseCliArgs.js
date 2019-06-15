import arg from 'arg'

export default rawArgs => {
  const commandLineArgs = {
    // Types
    '--report': Boolean,
    // Aliases
    '-r': '--report',
  }

  //https://www.npmjs.com/package/arg#argv
  const args = arg(commandLineArgs, {
    argv: rawArgs.slice(2),
  })

  return {
    reportMode: args['--report'] || false,
  }
}
