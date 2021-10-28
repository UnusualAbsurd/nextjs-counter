const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
    name: 'image',
    aliases: ['img'],
    description: 'Search images from google!',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        if(!args.length) return errorMsg("Missing Option `IMAGE NAME`");

        try{
        await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${client.config.api.google}&cx=${client.config.api.cx}&q=${args.join(" ")}&searchType=image`,
            {
                method: "GET",
            }
        )
        .then(response => response.json())
        .then((res) => {
            if(!res.items?.length) return errorMsg("No results for `" + args.join(" ") + '`');

            const random = Math.floor(Math.random() * res.items.length);

            message.channel.send({
                files: [
                    new MessageAttachment(`${res.items[random].link}`, `${res.items[random].title.trim().split(/ +/g)[0]}.png`)
                ]
            })
        })
        }
        catch(e) {
            errorMsg(e.message)
        }

    }
}