const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Get information of the server!',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        const row = new MessageActionRow()
        .addComponents([new MessageButton().setLabel("Owner Information").setCustomId('ownerinfo').setStyle("SECONDARY").setEmoji("👑")])
        
        const embed = new MessageEmbed()
        .setColor(client.config.color)
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL({dynamic: true}) || null)
        .addField("General Information", [
            '\n',
            `Owner: <@!${owner.id}> (\`${owner.id}\`)`,
            `Server Creation: <t:${Math.floor(guild.createdTimestamp / 1000)}:D> [<t:${Math.floor(guild.createdTimestamp / 1000)}:R>]`,
            `[Server Icon](${guild.iconURL({dynamic: true, size: 512})})`
        ].join("\n"))
        .addField('Server Items', [
            `\n`,
            `Roles: **${guild.roles.cache.size}**`,
            `Highest Role: <@&${guild.roles.highest.id}>`,
            `Text Channels: **${guild.channels.cache.filter(ch => ch.isText()).size}**`,
            `Voice Channels: **${guild.channels.cache.filter(ch => ch.isVoice()).size}**`,
            `Thread Channels: **${guild.channels.cache.filter(ch => ch.isThread()).size}**`
        ].join('\n'))
        .addField('Members', [
           `Total Members: ${guild.memberCount}`,
        ].join('\n'))
        .setFooter("Server ID: " + guild.id, guild.iconURL({dynamic: true}) || null)

        interaction.reply({embeds: [embed], components: [row]})

    }
}