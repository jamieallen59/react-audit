// actions
const UPDATE_LINT_SOURCE = 'UPDATE_LINT_SOURCE'
const UPDATE_HAS_WEBPACK = 'UPDATE_HAS_WEBPACK'
const UPDATE_HAS_REACT = 'UPDATE_HAS_REACT'
const UPDATE_CSS_MODULES_SOURCE = 'UPDATE_CSS_MODULES_SOURCE'

export const updateLintSource = source => ({
  type: UPDATE_LINT_SOURCE,
  source
})

export const updateHasWebpack = () => ({
  type: UPDATE_HAS_WEBPACK,
})

export const updateHasReact = () => ({
  type: UPDATE_HAS_REACT,
})

export const updateCssModulesSource = source => ({
  type: UPDATE_CSS_MODULES_SOURCE,
  source
})

// reducer
export const initialState = {
  hasReact: false,
  hasWebpack: false,
  lintSource: '',
  cssModulesSource: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case UPDATE_LINT_SOURCE:
    return {
      ...state,
      lintSource: action.source
    }
  case UPDATE_HAS_WEBPACK:
    return {
      ...state,
      hasWebpack: true
    }
  case UPDATE_HAS_REACT:
    return {
      ...state,
      hasReact: true
    }
  case UPDATE_CSS_MODULES_SOURCE:
    return {
      ...state,
      cssModulesSource: action.source
    }
  default:
    return state
  }
}
