const Discord = require('discord.js')
const { modLog } = require('../../functions/guild/modlog')

/**
* @param {Discord.Client} client
* @param {Discord} Discord
* @param {Discord.Message} message
*/
module.exports = async(client, message) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}), message.author.displayAvatarURL({dynamic: true}))
    .setColor("ORANGE")
    .setTimestamp()
    .addField("Message Creation", [
      `<t:${Math.floor(message.createdTimestamp / 1000)}:R>`
    ].join("\n"))
    
    const msg = [
      `**Message by <@!${message.author.id}> was deleted in ${message.channel}**`
    ]

    if(message.content) {
      msg.push(message.content)
    }
    

    if(message.attachments) {
        msg.push(`${message.attachments.first().attachment.toString()}` || "")
        try{
        embed.setImage(message.attachments.first().proxyURL)
        }
        catch(e) {
          
        }
    }

   
    embed.setDescription(msg.join("\n\n"))

    await modLog(message, embed);
}