const { Client, Message, MessageEmbed } = require('discord.js');
const { modLog } = require('../../functions/guild/modlog');
const db = require('../../models/Users')

module.exports = {
    name: 'warnings',
    aliases: ['warns'],
    description: 'Display warnings of a user!',
    category: 'moderation',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        let user = message.mentions.members.first() || (await message.guild.members.fetch(`${args[0]}`).catch(() => {}));
        if(!args.length) user = message.member;
        if(!user) return errorMsg(`Couldn't find user \`${args[0] || "null"}\``);

        const data = await db.find({ guild: message.guildId, user: user.id });
        if(!data?.length) return errorMsg(`**${user.user.tag}** does not have any warnings in this server.`);


        const warns = data.map((w) => {
            const moderator = message.guild.members.cache.get(`${w.moderator}`) || "User has left";
            return [
               `ID: \`${w._id}\` | Moderator: \`${moderator.user.tag}\``,
               `Reason: ${w.reason} - <t:${w.timestamp}:D>`
            ].join("\n")
        }).join("\n\n")

        message.channel.send({
            embeds: [new 
            MessageEmbed()
            .setAuthor(`${user.user.tag} Warnings`, user.displayAvatarURL({dynamic: true}))
            .setColor(client.config.color)
            .setDescription(`${await warns}`)
            .setTimestamp()
           ]
        })

       

    }
}