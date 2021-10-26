const m = require('mongoose')

module.exports = m.model('guilds', new m.Schema({
  guild: String,
  modlog: String,
  prefix: String
}))