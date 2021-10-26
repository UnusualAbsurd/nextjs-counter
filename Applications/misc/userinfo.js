const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get information of a user!',
    options: [
        {
            name: "user",
            description: "The user that you want to get information from",
            type: "USER",
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {


        const user = interaction.options.getMember('user') || interaction.member;

        const row  = new MessageActionRow()
        .addComponents([new MessageButton().setCustomId('showroles').setLabel("Show Roles").setStyle("SECONDARY")])

        const filter = {
            owner: interaction.guild.ownerId === user.id
        }

        let ack;
        if(interaction.guild.ownerId === user.id) ack = "Server Owner";
        if(user.permissions.has("ADMINISTRATOR") && !filter.owner) ack = "Server Administrator";
        if(user.permissions.has(["MANAGE_ROLES", "MANAGE_MESSAGES"]) && !user.permissions.has("ADMINISTRATOR") && !filter.owner) ack = "Server Moderator";
        if(user.permissions.has(["SEND_MESSAGES"]) && !user.permissions.has(["MANAGE_ROLES", "MANAGE_MESSAGES"]) && !filter.owner) ack = "Server Member";

        const embed = new MessageEmbed()
        .setColor(user.user.accentColor ||  user.roles.highest.color || client.config.color)
        .setAuthor(user.user.tag, user.displayAvatarURL({dynamic: true}))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setDescription(`<@!${user.id}> (\`${user.id}\`) - [Avatar](${user.displayAvatarURL({dynamic: true})})`)
        .addFields(
            { name: "Creation Date", value: `<t:${Math.floor(user.user.createdTimestamp / 1000)}:D>\n[ <t:${Math.floor(user.user.createdTimestamp / 1000)}:R> ]`, inline: true },
            { name: `Server Joined Date`, value: `<t:${Math.floor(user.joinedTimestamp / 1000)}:D>\n[ <t:${Math.floor(user.joinedTimestamp / 1000)}:R> ]`, inline: true }, 
            { name: "Acknowledgement", value: `${ack}` }
        )
        .setFooter(user.id)
        .setTimestamp()

        if(user.user.banner) embed.setImage(user.user.bannerURL({dynamic: true}))

        interaction.reply({embeds: [embed], components: [row]})
 
    }
}