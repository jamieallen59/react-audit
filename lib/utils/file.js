import fs from 'fs'
import path from 'path'
import { logWarn } from './log'

export const readFile = fileName => {
  if(!fs.existsSync(fileName)) {
    const error = `File ${fileName} not found`
    logWarn(error)

    return {
      error
    }
  }
  const result = fs.readFileSync(fileName, { encoding: 'utf-8' })

  return {
    result: JSON.parse(result)
  }
}

export const writeFile = (fileName, newFile) => {
  if(!fs.existsSync(fileName)) {
    return {
      error: `File ${fileName} not found`
    }
  }

  try {
    fs.writeFileSync(fileName, newFile)

    return { result: true }
  } catch (error) {
    return { error }
  }
}

export const readModule = fileName => {
  if(!fs.existsSync(fileName)) {
    const error = `File ${fileName} not found`
    logWarn(error)

    return {
      error
    }
  }
  const pathName = path.join(process.cwd(), fileName)

  const result = require(pathName)

  return {
    result
  }
}
