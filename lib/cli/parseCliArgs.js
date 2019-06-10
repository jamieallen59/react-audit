import arg from 'arg'

export default rawArgs => {
  const commandLineArgs = {
    // Types
    '--yes': Boolean,
    // Aliases
    '-y': '--yes',
  }


  //https://www.npmjs.com/package/arg#argv
  const args = arg(commandLineArgs, {
    argv: rawArgs.slice(2),
  })

  return {
    skipPrompts: args['--yes'] || false,
  }
}
