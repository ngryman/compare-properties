'use strict'

var compareFactory = require('./index')
  , expect = require('expect.js')

var compareStatements = {
  '=': 'a === b',
  '<': 'a < b',
  '>': 'a > b',
  '<=': 'a <= b',
  '>=': 'a >= b',
  '!=': 'a !== b',
  '%=': '0 === a % b'
}

describe('compare functions', function() {
  var proto = {
    get foo() { this.fooCalls++ },
    get bar() { this.barCalls++ }
  }

  var obj1 = Object.create(proto)
    , obj2 = Object.create(proto)

  beforeEach(function() {
    obj1.fooCalls = obj2.fooCalls = 0
    obj1.barCalls = obj2.barCalls = 0
  })

  compareFactory.operators.forEach(function(operator) {
    context('given "' + operator + '" operator', function() {
      it('compares two values correctly', function() {
        var functionBody = compareFactory.comparators[operator].toString()
        expect(functionBody).to.contain(compareStatements[operator])
      })

      context('with two property names', function() {
        var compare = compareFactory(operator, 'foo', 'bar')

        it('returns a comparator function', function() {
          expect(compare).to.be.a('function')
        })

        it('compares correct properties', function() {
          compare(obj1, obj2)
          expect(obj1.fooCalls).to.be(1)
          expect(obj1.barCalls).to.be(0)
          expect(obj2.fooCalls).to.be(0)
          expect(obj2.barCalls).to.be(1)
        })
      })

      context('with only one property name', function() {
        var compare = compareFactory(operator, 'foo')

        it('returns a comparator function', function() {
          expect(compare).to.be.a('function')
        })

        it('compares correct properties', function() {
          compare(obj1, obj2)
          expect(obj1.fooCalls).to.be(1)
          expect(obj1.barCalls).to.be(0)
          expect(obj2.fooCalls).to.be(1)
          expect(obj2.barCalls).to.be(0)
        })
      })
    })
  })
})
