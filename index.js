'use strict'

/* List of built-in operators. */
var operators = '= < > <= >= != %='.split(' ')

/* Lookup table of compare functions. */
var comparators = operators.reduce(function(res, operator) {
  var trueOperator = operator

  if ('=' === operator) {
    trueOperator = '==='
  }
  else if ('!=' === operator) {
    trueOperator = '!=='
  }

  if ('%=' === operator) {
    res[operator] = function(a, b) { return (0 === a % b) }
  }
  else {
    res[operator] = new Function('a', 'b', 'return (a ' + trueOperator + ' b)')
  }

  return res
}, {})

/**
 * Get a compare function given an operator.
 *
 * @param {string} operator Operator used to compare.
 * @param {string} prop1 Name of property to check for 1st object.
 * @param {string} [prop2] Name of property to check for 2nd object.
 * @return {function} Compare function taking two arguments.
 */
function compareFactory(operator, prop1, prop2) {
  var compare = comparators[operator]

  if (null == prop2) {
    prop2 = prop1
  }

  return function(o1, o2) {
    return compare(o1[prop1], o2[prop2])
  }
}

/* Expose operators and comparators as factory properties. */
compareFactory.operators = operators
compareFactory.comparators = comparators

/* Exports */
module.exports = compareFactory
