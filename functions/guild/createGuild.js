const db = require('../../models/Guilds');

async function newGuild(guild) {
    const data = await db.findOne({guild});
    if(data) return;
    if(!data) {
        new db({
            guild,
            prefix: '-',
            modlog: null
        }).save();
    }
}

module.exports = { newGuild }