const m = require('mongoose');

module.exports = m.model("anti-invites-guilds", new m.Schema({
    guild: String,
    status: Boolean
}))