const api = require('./api')
const urls = require('./url')

module.exports = (params = {}) => {
  const url = urls(params.token || process.env.HH_TOKEN)
  const proxy = method => ({postcode, term}, done) =>
    method(url.search(postcode, term), resp => {
      const err = false === resp
        ? (new Error('Error getting data')) : undefined
      done(err, false !== resp && resp)
    })

  return {
    getRestaurantName: proxy(api.getRestName),
    getRestaurants: proxy(api.getRestaurants)
  }
}
