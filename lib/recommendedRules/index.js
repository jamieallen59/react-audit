
const TEST_KEY = 'stuff'
const REACT_DESCTRUCTURING_ASSIGNMENT_KEY = 'react/destructuring-assignment'

const reccomendedRules = [
  TEST_KEY,
  REACT_DESCTRUCTURING_ASSIGNMENT_KEY
]

const getRulesToLookFor = allFoundRules => {
  return reccomendedRules.map(rule => ({
    rule: allFoundRules[rule],
    key: rule
  }))
}

export default getRulesToLookFor
