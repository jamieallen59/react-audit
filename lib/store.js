import reducer, { initialState } from './reducer'

const createStore = (reducer, preLoadedState) => {
  let currentState = preLoadedState
  let currentReducer = reducer

  const dispatch = action => {
    currentState = currentReducer(currentState, action)
  }

  const getState = () => {
    return currentState
  }

  return {
    getState,
    dispatch
  }
}

let store = createStore(reducer, initialState)

export default store
