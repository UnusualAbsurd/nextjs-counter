const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ticket',
    permissions: ["ADMINISTRATOR"],
    description: 'The ticket system the bot has!',
    category: 'config',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        message.channel.send({
            embeds: [new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setDescription(`Ticket system setup is using the \`/ticket <sub_command>\`! Please use the ticket system by typing \`/ticket\` and view the options you want to set!`)
            ]
        })

    }
}