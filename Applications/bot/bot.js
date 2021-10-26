const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bot',
    description: 'Get info of the bot!',
    options: [
      {
          name: 'ping',
          description: "Get the latency of the bot!",
          type: "SUB_COMMAND"
      }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        const [subcommand] = args;
        if(subcommand === 'ping') {
            interaction.reply({ ephemeral: true, content: `Pong! \`${client.ws.ping}ms\`` })
        }

    }
}