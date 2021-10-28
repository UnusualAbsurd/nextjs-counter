const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default

module.exports = {
    name: 'meme',
    description: 'Funny meme. Pls laugh',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        try{
          await fetch('https://api.popcat.xyz/meme')
          .then(response => response.json())
          .then((res) => {
              message.channel.send({
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
            errorMsg(e.message)
        }

    }
}