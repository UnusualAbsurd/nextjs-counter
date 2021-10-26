const { Client, Message, MessageEmbed } = require('discord.js');
const { modLog } = require('../../functions/guild/modlog')

module.exports = {
    name: 'purge',
    aliases: ['prune', 'clean'],
    description: 'Bulk delete messages in your channel!',
    category: 'moderation',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, erroMsg) {

        const num = args[0];
        if(!num) return erroMsg(`Missing \`Number of messages\``);
        if(isNaN(num)) return errorMsg('Number of messages must be a `NUMBER`');

        if(num < 1 || num > 100) return errorMsg("Number of messages can only be `1 - 100`");

        message.channel.bulkDelete(parseInt(args[0]) + 1).catch((e) => {
            message.channel.send({
                content: '```' + e.message + '```'
            })
        });
    
        setTimeout(function() {
          message.channel.send({
              embeds: [new 
            MessageEmbed().setDescription(`Successfully deleted **${parseInt(args[0])}** message(s)`).setTimestamp().setColor(client.config.color)]
          })
        }, 1000)

        modLog(message, new MessageEmbed()
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
        .setColor(client.config.color)
        .setDescription([
            `**Action:** [Purge](${message.url})`,
            `**Channel:** ${message.channel}`,
            ``,
            `Date: <t:${Math.floor(Date.now() / 1000)}:D>`
        ].join("\n"))
        )
    }
}