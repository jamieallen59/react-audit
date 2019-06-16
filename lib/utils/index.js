import { readFile, writeFile, readModule } from './file'

// TODO: extract to other file
export const getRuleInfo = ruleObject => {
  const data = Object.entries(ruleObject)

  return data[0]
}

export {
  readFile,
  writeFile,
  readModule
}
