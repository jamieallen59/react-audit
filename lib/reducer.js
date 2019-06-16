const UPDATE_LINT_SOURCE = 'UPDATE_LINT_SOURCE'

export const updateLintSource = lintSource => ({
  type: UPDATE_LINT_SOURCE,
  lintSource
})

export const initialState = {
  lintSource: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case UPDATE_LINT_SOURCE:
    return {
      ...state,
      lintSource: action.lintSource
    }
  default:
    return state
  }
}
