const JsonDB = require('node-json-db')
// const { Config } = require('node-json-db/lib/JsonDBConfig')

const db = new JsonDB('instarocketDB', true, true, '/')

module.exports = db
