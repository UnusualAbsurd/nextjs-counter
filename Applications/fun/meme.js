const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default


module.exports = {
    name: 'meme',
    description: 'Funny meme. Pls laugh',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        try{
          await fetch('https://api.popcat.xyz/meme')
          .then(response => response.json())
          .then((res) => {
            interaction.reply({
                  embeds: [
                      new MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`${res.title}`)
                      .setURL(`${res.url}`)
                      .setImage(`${res.image}`)
                      .setFooter(`👍 ${res.upvotes} | 💬 ${res.comments}`)
                  ]
              })
          })
        } 
        catch(e) {
            interaction.reply({ content: e.message, ephemeral: true})
        }

    }
}