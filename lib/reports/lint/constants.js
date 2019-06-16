export const ESLINTRC_PATH = '.eslintrc.json'

export const ESLINT_SOURCE_TYPES = Object.freeze({
  ESLINTRC: 'eslintrc.json',
  PACKAGE_JSON: 'package.json',
})

export const ESLINT_RECOMMENDED_RULES = [
  { 'react/destructuring-assignment': [2, 'always'] },
  { 'react/prop-types': [2] },
  { 'react/no-unused-prop-types': [2] },
  { 'react/require-default-props': [2] },
  { 'react/forbid-prop-types': [2] }
]
