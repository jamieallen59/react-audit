// check if they are in a create-react-app or have react-scripts
// if so, check for .module.scss .module.less .module.css

// check if they have webpack
// check for style-loader and css-loader
import store from '../../store'
import { updateCssModulesSource } from '../../reducer'
import { readFile, readModule } from '../../utils'
import { PACKAGE_JSON_PATH } from '../../constants'
import { CSS_MODULES_SOURCE_TYPES, WEBPACK_PATH } from './constants'

const checkReactScripts = packageJson => {
  // check both just in case
  const { dependencies = {}, devDependencies = {} } = packageJson
  const reactScripts = dependencies['react-scripts']
  const devDepReactScripts = devDependencies['react-scripts']

  const hasReactScripts = reactScripts || devDepReactScripts

  if (hasReactScripts) {
    store.dispatch(updateCssModulesSource(CSS_MODULES_SOURCE_TYPES.REACT_SCRIPTS))
  }

  return hasReactScripts
}

const checkWebpack = () => {
  const { hasWebpack } = store.getState()

  if (!hasWebpack) {
    return
  }

  const { result } = readModule(WEBPACK_PATH)
  // https://webpack.js.org/concepts/#loaders
  const { module: { rules = [] } = {} } = result

  const hasCssWebpackLoader = rules
    .filter(({ test }) => {
      // pick out loaders testing .css, .scss or .less files
      const stringifiedTest = String(test)

      const isCssRelevant = stringifiedTest.includes('css')
        || stringifiedTest.includes('less')

      return isCssRelevant
    })
    .find(({ use }) => {
      if (typeof use === 'string') {
        // style-loader and css-loader should be in an array together
        return false
      }

      return use.includes('css-loader')
    })

  return hasCssWebpackLoader
}

const cssReport = () => {
  const { result } = readFile(PACKAGE_JSON_PATH)

  const hasReactScripts = checkReactScripts(result)
  const hasCssWebpackLoader = checkWebpack()

  const hasCssModules = hasReactScripts || hasCssWebpackLoader

  return {
    hasCssModules
  }
}

export default cssReport
