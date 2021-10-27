const { Client, Message, MessageEmbed } = require('discord.js');
const { newGuild } = require('../../functions/guild/createGuild');
const db = require('../../models/Guilds')

module.exports = {
    name: 'setprefix',
    description: 'Custom prefix for the server',
    category: 'config',
    permissions: ["MANAGE_GUILD"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {
        if(!args.length) return errorMsg("Missing `New Prefix`");

        const data = await db.findOne({guild: message.guildId});
        if(!data) await newGuild(message.guildId);

        data.prefix = args[0];
        data.save(function() {
            message.channel.send({
                embeds: [new MessageEmbed().setDescription(`Successfully changed **${message.guild.name}** prefix into \`${args[0]}\``).setTimestamp().setColor(client.config.color)]
            })
        })
    }
}