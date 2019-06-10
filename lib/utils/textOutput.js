import chalk from 'chalk'

// http://chir.ag/projects/name-that-color
const DODGER_BLUE = '#33D1FF'
const MALACHITE = '#17D73D'
const THUNDERBIRD = '#D73417'
const MAGNO_TANGO = '#D48302'

const red = text => chalk.hex(THUNDERBIRD)(text)
const green = text => chalk.hex(MALACHITE)(text)
const blue = text => chalk.hex(DODGER_BLUE)(text)
const orange = text => chalk.hex(MAGNO_TANGO)(text)

export {
  red,
  green,
  blue,
  orange
}
