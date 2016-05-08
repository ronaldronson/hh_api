'use strict'

const request = require('request')
const headers = require('./config').headers
const parser = require('xml-parser')
const log = require('./log')

const transformRestName = str =>
  (str || '')
    .toLocaleLowerCase()
    .replace(/@/g, 'at')
    .replace(/ /g, '-')

const normalizeSearch = str =>
  (str || '')
    .toLocaleLowerCase()
    .trim()
    .split(' ').shift()

const filterType = type =>
  prop => prop.attributes.type === type

const filterSponsored = rest =>
  !rest.children.filter(filterType('sponsor')).shift()

function getOneRest(xml) {
  try {
    const rest = getRests(xml).pop() // take first restaurant
    const attr = rest.children.filter(filterType('name')).pop()

    log('find rest: ', attr.content || '[empty value]')
    return transformRestName(attr.content) || false
  } catch (e) {
    log('error ', e)
    return false
  }
}

function getRestList(xml) {
  const flatData = list => list.reduce((acc = {}, attr) =>
    (acc[attr.attributes.type] = attr.content, acc))

  const merger = (a, b) => Object.keys(a)
    .reduce((acc, key) => (b[key] = a[key], b), b)

  return getRests(xml)
    .map(rest => merger(rest.attributes, flatData(rest.children)))
}

function getRests(xml) {
  try {
    const rests = parser(xml).root
      .children[1] // result
      .children[3] // restaurants
      .children
      .filter(filterSponsored) // filter sponsored
      .slice(0, 5)

    if (!rests) {
      // no rest found
      log('no rest found')
      return false
    }

    return rests
  } catch (e) {
    log('error ', e)
    return false
  }
}

const caller = fin => (url, done) => {
  log('req url: ', url)
  request({
      uri: normalizeSearch(url),
      headers: headers
    },
    (err, response, body) => done(fin(body))
  )
}

module.exports = ({
  getRestName: caller(getOneRest),
  getRestaurants: caller(getRestList)
})
