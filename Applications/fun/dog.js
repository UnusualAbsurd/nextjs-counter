const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'dog',
    description: 'Get a random dog image!',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        try{
        await fetch(`https://api.thedogapi.com/v1/images/search`)
        .then(response => response.json())
        .then((res) => {
          interaction.reply({
              embeds: [
                  new MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle("Woof.. 🐕‍🦺")
                  .setURL(res[0].url)
                  .setImage(res[0].url)
                  .setFooter(`Requested By: ${interaction.user.tag}`, interaction.user.displayAvatarURL({dynamic: true}))
              ]
          })
        })
    }
    catch(e) {
        interaction.reply(e.message);
    }

    }
}