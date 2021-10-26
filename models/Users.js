const m = require('mongoose')

module.exports = m.model('guild-users', new m.Schema({
    user: String,
    guild: String,
    reason: String,
    timestamp: Number,
    moderator: String,
}))