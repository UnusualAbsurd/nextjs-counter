const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'cat',

    description: 'Get a random cat image!',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        try{
        await fetch(`https://api.thecatapi.com/v1/images/search`)
        .then(response => response.json())
        .then((res) => {
          interaction.reply({
              embeds: [
                  new MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle("Meow.. 🐈")
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