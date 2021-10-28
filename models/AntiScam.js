const m = require('mongoose');

module.exports = m.model('antiscam-guilds', new m.Schema({
    guild: String,
    status: Boolean
}))