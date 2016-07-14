'use strict'
const cousines = require('./cousines')

const config = require('./config')
const filter = require('./validation').postcode

function normilizePostcode(val) {
  const postcode = filter(val)
  return postcode ? postcode[0] : ''
}

module.exports = (hh_token) => ({
  search: (postcode, term) =>
    config.domain + '/api/iphone-'
      + hh_token + '/search/'
      + normilizePostcode(postcode)
      + '/' + (cousines(term) || 'All')
      + '/0-10/?q=' + term
})
