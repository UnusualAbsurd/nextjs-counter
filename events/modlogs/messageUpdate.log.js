const Discord = require('discord.js')
const { modLog } = require('../../functions/guild/modlog');

/**
* @param {Discord.Client} client
* @param {Discord} Discord
* @param {Discord.Message} oldmsg
* @param {Discord.Message} newmsg
*/
module.exports = async(client, oldmsg, newmsg) => {
    if(!oldmsg.content || !newmsg.content) return;  
    if(oldmsg.content === newmsg.content || oldmsg.content == newmsg.content) return;

    const embed = new Discord.MessageEmbed()
    .setColor("NAVY")
    .setAuthor(newmsg.author.tag, newmsg.author.displayAvatarURL({dynamic: true}))
    .setDescription([
        `**A message by <@!${newmsg.author.id}> was edited in <#${newmsg.channel.id}>**`,
        ``,
        `Message Creation: <t:${Math.floor(oldmsg.createdTimestamp / 1000)}:R>`
    ].join("\n"))
    .addFields(
        { name: "Old Message", value: `${oldmsg.content}` },
        { name: "New Message", value: `${newmsg.content}` }
    )
    .setTimestamp()

    modLog(newmsg,  
    embed)

}