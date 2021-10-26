const db = require('../../models/Guilds')

async function modLog(message, embed, row) {
  const guild = message.guildId
   const data = await db.findOne({guild});
   if(!data) return;
   const channel = message.guild.channels.cache.get(data.modlog);
   if(!channel) return;
   let comp;
   if(!row) comp = []
   if(row) comp = [row]
   channel.send({
       embeds: [embed],
       components: comp
   }).catch(() => {})
}

module.exports = { modLog }