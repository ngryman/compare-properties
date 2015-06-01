# compare-properties [![Build Status](https://travis-ci.org/ngryman/compare-properties.svg?branch=master)](https://travis-ci.org/ngryman/compare-properties)

> Get functions to compare two values given an operator.


## Install

```
$ npm install —save compare-properties
```


## Usage

```js
var compareFactory = require('compare-properties');

var equal = compareFactory('=', 'foo');
equal({ foo: 42 }, { foo: 42 }); //=> true
equal({ foo: 42 }, { foo: 10 }); //=> false
equal({ foo: 42 }, { bar: 42 }); //=> false

var equal = compareFactory('=', 'foo', 'bar');
equal({ foo: 42 }, { foo: 42 }); //=> false
equal({ foo: 42 }, { bar: 42 }); //=> true

var equal = compareFactory('<', 'foo');
equal({ foo: 'foo' }, { foo: 'foo' }); //=> true
equal({ foo: 'foo' }, { foo: 'fon' }); //=> true
equal({ foo: 1337 }, { bar: 42 }); //=> false
```


## Operators

| =         | <       | >       | <=       | >=       | !=       | %=            |
| --------- | ------- | ------- | -------- | -------- | -------- | ------------- |
| `a === b` | `a < b` | `a > b` | `a <= b` | `a >= b` | `a != b` | `a % b === 0` |


## License

MIT © [Nicolas Gryman](http://ngryman.sh)
