const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'dog',
    aliases: ['woof'],
    description: 'Get a random dog image!',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        try{
        await fetch(`https://api.thedogapi.com/v1/images/search`)
        .then(response => response.json())
        .then((res) => {
          message.channel.send({
              embeds: [
                  new MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle("Woof.. 🐕‍🦺")
                  .setURL(res[0].url)
                  .setImage(res[0].url)
                  .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
              ]
          })
        })
    }
    catch(e) {
        errorMsg(e.message);
    }

    }
}