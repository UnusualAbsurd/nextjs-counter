const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/AntiInvite')

module.exports = {
    name: 'antiinvite',
    permissions: ["MANAGE_GUILD"],
    description: 'Make the bot deletes invite links.',
    category: 'config',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg, prefix) {


        if (!args.length) return errorMsg(`\nDo \`${prefix}antiinvite true\` to enable anti-invite.\n\nDo \`${prefix}antiinvite false\` to disable.`);

        if (args[0] === 'true') {
            const data = await db.findOne({ guild: message.guildId });
            if (!data) new db({
                guild: message.guildId,
                status: true
            }).save(function() {
                message.channel.send({ embeds: [new MessageEmbed().setColor(client.config.color).setDescription("Successfully enabled anti-invite links in " + `**${message.guild.name}**`)] })
            });

            if (data) {
                if (data.status === true) return errorMsg("You already enabled anti-invite links in the server!");
                else {
                    data.status = true;
                    data.save(function() {
                        message.channel.send({ embeds: [new MessageEmbed().setColor(client.config.color).setDescription("Successfully enabled anti-invite links in " + `**${message.guild.name}**`)] })

                    })
                }
            }
        }
        if (args[0] === 'false') {
            const data = await db.findOne({ guild: message.guildId });
            if (!data) new db({
                guild: message.guildId,
                status: false
            }).save(function() {
                message.channel.send({ embeds: [new MessageEmbed().setColor(client.config.color).setDescription("Successfully disabled anti-invite links in " + `**${message.guild.name}**`)] })
            });

            if (data) {
                if (data.status === false) return errorMsg("You already enabled anti-invite links in the server!");
                else {
                    data.status = false;
                    data.save(function() {
                        message.channel.send({ embeds: [new MessageEmbed().setColor(client.config.color).setDescription("Successfully disabled anti-invite links in " + `**${message.guild.name}**`)] })
                    })
                }
            }
        }

    }
}