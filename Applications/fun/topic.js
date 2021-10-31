const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'topic',
    description: 'Get a random topic/question',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        const res = await fetch('https://raw.githubusercontent.com/UnusualAbsurd/DiscordScamLinksData/main/topics.yagpdb.json').then(response => response.json())

        interaction.reply({
            embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${res[Math.floor(Math.random() * res.length)]}`).setFooter("Requested By: " + interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))]
        })

    }
}