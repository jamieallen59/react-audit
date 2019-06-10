export const PACKAGE_JSON_PATH = './package.json'
export const ESLINTRC_PATH = '.eslintrc.json'
export const ROOT_PATH = './'

export const ESLINT_SOURCE_TYPES = Object.freeze({
  ESLINTRC: 'eslintrc.json',
  PACKAGE_JSON: 'package.json',
})

// Recommended eslint rules
const TEST_KEY = {'stuff': 0}
const REACT_DESCTRUCTURING_ASSIGNMENT_KEY = {
  'react/destructuring-assignment': [2, 'always']
}
const REACT_PROP_TYPES = {
  'react/prop-types': [2]
}
// TODO: change the reset to have full rules
const REACT_NO_UNUSED_PROP_TYPES = {
  'react/no-unused-prop-types': [2]
}
const REACT_REQUIRE_DEFAULT_PROPS = {
  'react/require-default-props': [2]
}
const REACT_FORBID_PROP_TYPES = {
  'react/forbid-prop-types': [2]
}

export const RECOMMENDED_RULES = [
  TEST_KEY,
  REACT_DESCTRUCTURING_ASSIGNMENT_KEY,
  REACT_PROP_TYPES,
  REACT_NO_UNUSED_PROP_TYPES,
  REACT_REQUIRE_DEFAULT_PROPS,
  REACT_FORBID_PROP_TYPES
]
