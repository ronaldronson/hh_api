'use strict'

const config = require('./config')
const filter = require('./validation').postcode

function normilizePostcode(val) {
  const postcode = filter(val)
  return postcode ? postcode[0] : ''
}

module.exports = (hh_token) => ({
  search: (postcode, term) =>
    config.domain + '/api/android-'
      + hh_token + '/quicksearch/'
      + normilizePostcode(postcode)
      + '/All/0-8/?q=' + term
})
