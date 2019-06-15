import fs from 'fs'

export const readFile = fileName => {
  if(!fs.existsSync(fileName)) {
    return {
      error: `File ${fileName} not found`
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
