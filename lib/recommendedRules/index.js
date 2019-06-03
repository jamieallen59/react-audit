
const TEST_KEY = 'stuff'

const REACT_DESCTRUCTURING_ASSIGNMENT_KEY = 'react/destructuring-assignment'
const REACT_PROP_TYPES = 'react/prop-types'
const REACT_NO_UNUSED_PROP_TYPES = 'react/no-unused-prop-types'
const REACT_REQUIRE_DEFAULT_PROPS = 'react/require-default-props'
const REACT_FORBID_PROP_TYPES = 'react/forbid-prop-types'

const reccomendedRules = [
  TEST_KEY,
  REACT_DESCTRUCTURING_ASSIGNMENT_KEY,
  REACT_PROP_TYPES,
  REACT_NO_UNUSED_PROP_TYPES,
  REACT_REQUIRE_DEFAULT_PROPS,
  REACT_FORBID_PROP_TYPES
]

const getRulesToLookFor = allFoundRules => {
  return reccomendedRules.map(rule => ({
    rule: allFoundRules[rule],
    key: rule
  }))
}

export default getRulesToLookFor
