const Discord = require('discord.js')
const fetch = require('node-fetch').default;

/**
* @param {Discord.Client} client
* @param {Discord.Message} message
*/
module.exports = async(client, message) => {

    await fetch('https://raw.githubusercontent.com/UnusualAbsurd/DiscordScamLinksData/main/scamlinks.json')
    .then(response => response.json())
    .then(scamLinks => {
        scamLinks.forEach(async link => {
        if(message.content?.toLowerCase()?.includes(link?.toLowerCase())) {
            if(message.deletable) message.delete();
            const msg = await message.channel.send({
                content: `<@!${message.author.id}>, we have detected a scam link. The server administrator have enabled anti-scam links in this server.`
            })
            setTimeout(() => msg.delete().catch(() => {}), 3000)
        } else return;
       })
    })

}