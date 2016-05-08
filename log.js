module.exports = (...args) =>  {
  process.env.DEBUG && console.log.apply(null, args)
}
