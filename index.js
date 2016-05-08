module.exports = (params = {}) => {
  const api = require('./api')
  const url = require('./url')(params.token || process.env.HH_TOKEN)

  return {
    getRestaurantName: ({postcode, term}, done) => {
      api.loadXml(url.search(postcode, term), resp => {
        const err = false === resp
          ? (new Error('Error getting restaurant')) : undefined;
        done(err, false !== resp && resp)
      });
    }
  }
}
