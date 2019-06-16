// actions
const UPDATE_LINT_SOURCE = 'UPDATE_LINT_SOURCE'
const UPDATE_HAS_WEBPACK = 'UPDATE_HAS_WEBPACK'
const UPDATE_HAS_REACT = 'UPDATE_HAS_REACT'

export const updateLintSource = lintSource => ({
  type: UPDATE_LINT_SOURCE,
  lintSource
})

export const updateHasWebpack = () => ({
  type: UPDATE_HAS_WEBPACK,
})

export const updateHasReact = () => ({
  type: UPDATE_HAS_REACT,
})

// reducer
export const initialState = {
  hasReact: false,
  lintSource: '',
  hasWebpack: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case UPDATE_LINT_SOURCE:
    return {
      ...state,
      lintSource: action.lintSource
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
  default:
    return state
  }
}
