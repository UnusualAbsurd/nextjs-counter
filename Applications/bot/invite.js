const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'The invite link for the bot!',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        interaction.reply({
            content: `Here is the invite for **${client.user.username}**!\n> [Administrator](https://discord.com/api/oauth2/authorize?client_id=902393086980816927&permissions=8&scope=bot%20applications.commands)\n> [Default Invite](https://discord.com/api/oauth2/authorize?client_id=902393086980816927&permissions=535750376663&scope=bot%20applications.commands)`
        })

    }
}