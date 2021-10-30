const m = require('mongoose');

module.exports =  m.model("ticketsupport-team-guilds", new m.Schema({
    guild: String,
    role: String
}))