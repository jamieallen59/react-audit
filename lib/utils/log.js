import chalk from 'chalk'

// http://chir.ag/projects/name-that-color
const DODGER_BLUE = '#33D1FF'
const MALACHITE = '#17D73D'
const THUNDERBIRD = '#D73417'
const MAGNO_TANGO = '#D48302'

const green = text => chalk.hex(MALACHITE)(text)
const blue = text => chalk.hex(DODGER_BLUE)(text)
const orange = text => chalk.hex(MAGNO_TANGO)(text)
const red = text => chalk.hex(THUNDERBIRD)(text)

const log = output => {
  console.log(` ${output}`)
}

const logSuccess = output => {
  log(green(output))
}

const logInfo = output => {
  log(blue(output))
}

const logWarn = output => {
  log(orange(output))
}

const logError = output => {
  log(red(output))
}

export {
  log,
  logSuccess,
  logInfo,
  logWarn,
  logError
}
