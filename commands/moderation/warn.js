const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('../../models/Users')
const { modLog } = require('../../functions/guild/modlog');


module.exports = {
    name: 'warn',
    permissions: ['MANAGE_MESSAGES'],
    description: 'Gives warning to a user!',
    category: 'moderation',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg) {

        const user = message.mentions.members.first() || (await message.guild.members.fetch(`${args[0]}`).catch(() => {}));

        if(!user) return errorMsg(`Couldn't find user \`${args[0] || "null"}\``)
        if(message.member.roles.highest.position <= user.roles.highest.position) return errorMsg("You cannot warn users with higher / same position  roles than you.");
        
        const reason = args.slice(1).join(" ") || "No Reason Provided"

        const data = new db({
           user: user.id,
           guild: message.guildId,
           reason,
           timestamp: Math.floor(Date.now() / 1000),
           moderator: message.author.id
        })
        
        data.save(function() {
            message.channel.send({
                embeds: [new
                MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Successfully warned **${user.user.tag}**`)
                .setTimestamp()
                ]
            })

            user.send({
                embeds: [new MessageEmbed().setAuthor(`${client.user.tag}`, client.user.displayAvatarURL()).setColor(client.config.color).setDescription("You have been warned in " + `**${message.guild.name}**`).setTimestamp().setFooter(`${data._id}-${message.guildId}`)],
                components: [new MessageActionRow().addComponents([new MessageButton().setLabel("View Reason").setStyle("SECONDARY").setCustomId("viewreason")])]
            }).catch(() => {})
        })

        await modLog(message, new MessageEmbed()
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription([
           `**Member:** \`${user.user.tag}\` (${user.id})`,
           `**Action:** [Warn](${message.url})`,
           `**Warn ID:** \`${data._id}\``,
           `**Reason:** ${reason}`,
           ` `,
           `Date: <t:${data.timestamp}:D>`
        ].join("\n"))
        .setFooter(`${data._id}`)
        .setColor(client.config.color),
        new MessageActionRow()
        .addComponents([
            new MessageButton()
            .setLabel("Delete Warn")
            .setStyle("DANGER")
            .setCustomId("delwarn")
        ])
        )

    }
}