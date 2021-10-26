const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Sends the client latency!',
    category: 'info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {

        const msg = await message.channel.send({ content: "<a:load:870226406704041985> Loading.." });

        msg.edit({ content: `Pong! \`${client.ws.ping}ms\`` })

    }
}