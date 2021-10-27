const Discord = require('discord.js')
const { modLog } = require('../../functions/guild/modlog')

/**
* @param {Discord.Client} client
* @param {Discord.GuildBan} ban
*/
module.exports = async(client, ban) => {


    ban.fetch()
    
    const log = (await ban.guild.fetchAuditLogs()).entries.filter(a => a.action === 'MEMBER_BAN_ADD').first()
    const autho = log.executor

    if(autho.id === client.user.id) return;

    const embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setTimestamp()
    .setAuthor(`${ban.user.tag} (${ban.user.id})`, ban.user.displayAvatarURL({dynamic: true}))
    .setDescription(`**${ban.user.tag} has been banned by <@!${autho.id}>**\n\nBan Date: <t:${Math.floor(log.createdTimestamp)}:D>`)
    .addField(`Reason`, `${ban.reason?.toString() || "No Reason Given"}`)
    .setFooter(ban.user.id)

    await modLog(ban, embed)
}