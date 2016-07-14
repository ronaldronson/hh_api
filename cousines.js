const log = require('./log')

const cousines = {
  'indian': 'indian',
  'chinese': 'chinese',
  'pizza': 'pizza',
  'sushi': 'sushi',
  'thai': 'thai',
  'halal': 'halal',
  'kebab': 'kebab',
  'american': 'american',
  'bangladeshi': 'bangladeshi',
  'breakfast': 'breakfast',
  'burger': 'burgers+&+chicken',
  'burgers': 'burgers+&+chicken',
  'charcoal': 'charcoal+chicken',
  'chicken': 'charcoal+chicken',
  'indian': 'indian',
  'italian': 'italian',
  'vegetarian': 'vegetarian',
  'vegan': 'vegan'
}

const regexps = Object.keys(cousines).map(str => new RegExp(str, 'gi'))

module.exports = str => {
  const res = regexps
    .map(reg =>  reg.exec(str))
    .filter(val => val)
    .shift()

  log(res && cousines[String(res[0]).toLowerCase()])

  return res && cousines[String(res[0]).toLowerCase()]
}
