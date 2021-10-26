const discord = require('discord.js');
const guildData = require('../../models/Guilds')

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 */
module.exports = async(client, message) => {



    const guildDB = await guildData.findOne({guild: message.guildId});
    let prefix;
    if(guildDB) prefix = guildDB.prefix;
    if(!guildDB) prefix = '-'

    
    if(message.content === `<@!${client.user.id}>`) return message.channel.send({ content: `**${message.guild.name}** Prefix is \`${prefix}\`` })

    if(message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length)
    .trim()
    .split(/ +/g)

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(a => a.aliases?.includes(cmd?.toLowerCase()));
    
    function errorMsg(msg) {
      return  message.channel.send({ embeds: [new discord.MessageEmbed().setColor("RED").setDescription(`<:RedTick:899904214740922378> ${msg}`).setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))] })
    }

    if(!command) return;
    if(command) {
        if(command?.permissions && command?.permissions?.length) {
            const perms = [];
            for(const permission of command.permissions) {
                perms.push(permission)
            }
            if(!message.member.permissions.has(perms)) return errorMsg(`Missing Permissions: \`${perms?.join(", ")}\``)
            else await command.execute(client, message, args, errorMsg)
        }  else await command.execute(client, message, args, errorMsg)

    }

}