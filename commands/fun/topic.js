const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'topic',
    description: 'Get a random topic / question',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {

        const res = await fetch('https://raw.githubusercontent.com/UnusualAbsurd/DiscordScamLinksData/main/topics.yagpdb.json').then(response => response.json())

        message.channel.send({
            embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${res[Math.floor(Math.random() * res.length)]}`).setFooter("Requested By: " + message.author.tag, message.author.displayAvatarURL({dynamic: true}))]
        })

    }
}