const m = require('mongoose');

module.exports = m.model("autorole-guilds", new m.Schema({
    guild: String,
    role: String
}))