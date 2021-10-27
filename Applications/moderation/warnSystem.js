const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const db = require('../../models/Users')
const { modLog } = require('../../functions/guild/modlog')

module.exports = {
    name: 'warn',
    description: 'Warning system using slash commands',
    options: [
        {
            name: 'add',
            description: "Add warnings to a user",
            type: "SUB_COMMAND",
            options: [
                { name: 'user', description: "The user that you want to warn", type: "USER", required: true },
                { name: "reason", description: "The reason why you want to warn this user", type: "STRING", required: false }
            ],
        }, // Add End
        {
            name: 'remove',
            description: "Delete a warning of a user",
            type: "SUB_COMMAND",
            options: [
                { name: "warn-id", description: "The warn ID you want to delete", type: "STRING", required: true },
                { name: "reason", description: "The reason why you want to delete this warning", type: "STRING", required: false }
            ],
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute(client, interaction, args) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || "No Reason Provided";
        const warnID = interaction.options.getString("warn-id");

        const [subcommand] = args;


        if (subcommand === 'add') {
            if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ ephemeral: true, content: "Missing Permission `MANAGE_MESSAGES`" })
            const data = new db({
                user: user.id,
                guild: interaction.guildId,
                reason,
                timestamp: Math.floor(Date.now() / 1000),
                moderator: interaction.user.id
            })

            data.save(function () {
                interaction.reply({
                    embeds: [new
                        MessageEmbed()
                        .setColor(client.config.color)
                        .setDescription(`Successfully warned **${user.user.tag}**`)
                        .setTimestamp()
                    ]
                })

                user.send({
                    embeds: [new MessageEmbed().setAuthor(`${client.user.tag}`, client.user.displayAvatarURL()).setColor(client.config.color).setDescription("You have been warned in " + `**${interaction.guild.name}**`).setTimestamp().setFooter(`${data._id}-${interaction.guildId}`)],
                    components: [new MessageActionRow().addComponents([new MessageButton().setLabel("View Reason").setStyle("SECONDARY").setCustomId("viewreason")])]
                }).catch(() => { })
            })

            await modLog(interaction, new MessageEmbed()
                .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription([
                    `**Member:** \`${user.user.tag}\` (${user.id})`,
                    `**Action:** Warn`,
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

        if (subcommand === 'remove') {
            if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({ ephemeral: true, content: "Missing Permission `MANAGE_ROLES`" })

            const data = await db.findOne({ guild: interaction.guildId, _id: warnID }).catch(() => { });
            if (!data) return interaction.reply(`Couldn't find a warn with the ID of \`${warnID}\``);

            const reason = args.slice(1).join(" ") || "No Reason Provided"

            if (data) {
                let user = await client.users.fetch(data.user);
                if (!user) user = "Deleted User";

                data.delete(async function () {
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setDescription(`Deleted **${user.tag}** warning \`${warnID}\``)
                                .setColor(client.config.color)
                                .setTimestamp()
                        ]
                    })

                    await modLog(interaction, new MessageEmbed()
                        .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription([
                            `**Member:** \`${user.tag}\` (${user.id})`,
                            `**Action:** Delete Warn`,
                            `**Warn ID:** \`${warnID}\``,
                            `**Reason:** ${reason}`,
                            ` `,
                            `Date: <t:${Math.floor(Date.now() / 1000)}:D>`
                        ].join("\n"))
                        .setColor(client.config.color)
                    )

                })
            }
        }

    }
}