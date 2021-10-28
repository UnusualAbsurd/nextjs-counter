const Discord = require('discord.js')

/**
* @param {Discord.Client} client
* @param {Discord.Guild} guild
*/
module.exports = async(client, guild) => {

    const target = await guild.fetchOwner()

    target.send({
        embeds: [
            new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(client.config.color)
            .setTimestamp()
            .setDescription(
            [
            `Hello **${target.user.tag}**! Thank you for inviting me to **${guild.name}**! I really appreciate it!`,
            ``,
            `My default prefix is \`-\`, but you can change it using \`/setprefix <new_prefix>\`!`,
            `If you are a developer also! You can visit my open source code below!`,
            `Anyways, thanks again! Cya! 👋`,
            ].join("\n"))
            .addField('General Information', 
            [`Total Commands: [ **${client.commands.size}** ]`,`Invites: [\[ Admin \]](${client.config.invite.admin}) | [\[ Default \]](${client.config.invite.default})`].join("\n"))
        ],
        components: [
            new Discord.MessageActionRow()
            .addComponents([
               new Discord.MessageButton()
               .setLabel("Open Source")
               .setStyle("LINK")
               .setURL("https://github.com/UnusualAbsurd/adv-discord-bot")
               .setEmoji("<:githubblack:903132114906648667>")
            ])
        ]
    }).catch(() => {})
}