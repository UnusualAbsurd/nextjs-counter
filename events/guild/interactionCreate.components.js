const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js/src/index.js');
const warnDB = require('../../models/Users')
const {
  modLog
}
= require('../../functions/guild/modlog')

/**
* @param {Discord.Client} client
* @param {Discord.CommandInteraction} interaction
*/
module.exports = async (client, interaction) => {

    if (interaction.isButton()) {
        if (interaction.message.author.id !== client.user.id) return;
        /**
         * Show Roles
         */
        if (interaction.customId === 'showroles') {
            const user = await interaction.guild.members.fetch(`${interaction.message.embeds[0].footer.text}`);
            if (!user) return interaction.reply({ ephemeral: true, content: `User has left the server. Couldn't fetch roles.` })

            if (user) {

                const roles = user.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => role.toString())
                    .slice(0, -1)

                interaction.reply({
                    ephemeral: true,
                    embeds: [new Discord.MessageEmbed().setTitle(`Roles [${roles.length}]`).setColor(user.roles.highest.color || client.config.color).setDescription(`${roles?.join(" ") || "No Custom Server Roles"}`).setTimestamp().setAuthor(user.user.tag, user.displayAvatarURL({ dynamic: true }))]
                })
            }
        } // Show Roles End
        /**
         * Search Command ( Help );
         */
        if (interaction.customId === 'search-command') {
            const filter = m => m.author.id == interaction.user.id
            var collector = interaction.channel.createMessageCollector({ filter, time: 30 * 1000 });
            interaction.reply({ ephemeral: true, content: "You have **30 seconds** to search the commands. Type the command name you would like to search.\nType `end` if you would like to stop." });
    
            collector.on('collect', (m) => {
                const command = client.commands.get(m.content.toLowerCase()) || client.commands.find(a => a.aliases?.includes(m.content.toLowerCase()));
                if(m.content?.toLowerCase() === 'end') {
                    m.reply({ content: "Stopped." })
                    collector.stop();
                }
                if(m.content?.toLowerCase() !== 'end') {
                if (!command) return m.reply({content: `Couldn't find the command \`${m.content}\`` });
                if (command) {
                    m.reply({
                        embeds: [new MessageEmbed().setColor(client.config.color)
                            .setTitle(`${command.name}`).setDescription(`${command.description || "No Description"}`).addField("Aliases", `${command.aliases?.join(", ") || "No Aliases"}`)]
                    })
                }
               }
            })
        } // Search Command End
        /**
         * Sarch Slash Command
         */
        if(interaction.customId === 'search-slash') {
            const filter = m => m.author.id == interaction.user.id
            var collector = interaction.channel.createMessageCollector({ filter, time: 30 * 1000 });
            interaction.reply({ ephemeral: true, content: "You have **30 seconds** to search the commands. Type the command name you would like to search.\nType `end` if you would like to stop." });
    
            collector.on('collect', (m) => {
                const command = client.slashCommands.get(m.content.toLowerCase()) || client.slashCommands.find(a => a.name?.includes(m.content.toLowerCase()));
                if(m.content?.toLowerCase() === 'end') {
                    m.reply({ content: "Stopped." })
                    collector.stop();
                }
                if(m.content?.toLowerCase() !== 'end') {
                if (!command) return m.reply({content: `Couldn't find the slash command \`${m.content}\`` });
                
                if (command) {
                    m.reply({
                        embeds: [new MessageEmbed().setColor(client.config.color)
                        .setTitle(`/${command.name}`).setDescription(`${command.description || "No Description"}`)]
                    })
                }
               }
            })
        } // Search slash End
        /**
         * Owner Info
         */
        if(interaction.customId === 'ownerinfo') {
            const user = await interaction.guild.fetchOwner()

            const embed = new MessageEmbed()
            .setColor(user.user.accentColor ||  user.roles.highest.color || client.config.color)
            .setAuthor(user.user.tag, user.displayAvatarURL({dynamic: true}))
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addFields(
                { name: "User", value: `<@!${user.id}> (\`${user.id}\`) - [Avatar](${user.displayAvatarURL({dynamic: true})})` },
                { name: "Creation Date", value: `<t:${Math.floor(user.user.createdTimestamp / 1000)}:D> [<t:${Math.floor(user.user.createdTimestamp / 1000)}:R>]`, inline: true },
                { name: `Server Joined Date`, value: `<t:${Math.floor(user.joinedTimestamp / 1000)}:D> [<t:${Math.floor(user.joinedTimestamp / 1000)}:R>]`, inline: true },
                { name: "Acknowledgement", value: `Server Owner` }
            )
            .setFooter(user.id)
            .setTimestamp()

            interaction.reply({ephemeral: true, embeds: [embed]})
           
        } // owner info end
        /**
         * View Warn Reason 
         */
        if(interaction.customId === 'viewreason') {
            const text = interaction.message.embeds[0].footer.text?.split("-")
            const data = await warnDB.findOne({ _id: text[0], guild: text[1] });
            if(!data) return interaction.reply({ ephemeral: true, content: `Warn ID: \`${text[0]}\` does not exist.` });
            if(data) {
                const moderator = await client.users.fetch(`${data.moderator}`) || "Deleted User";
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(client.config.color)
                        .setTimestamp()
                        .setAuthor(`Warned By: ${moderator.tag} (${moderator.id})`, moderator.displayAvatarURL({dynamic: true}))
                        .setDescription(`${data.reason}`)
                        .setTimestamp()
                    ], ephemeral: true
                })
            }
        } // Warn Reason End
        /**
         * Warn Delete button from Mod Log
         */
        if(interaction.customId === 'delwarn') {
            const text = interaction.message.embeds[0].footer.text;
        
            const data = await warnDB.findOne({ _id: text, guild: interaction.guildId });
            if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({
                ephemeral: true,
                content: "Missing Permission `MANAGE_ROLES`"
            })

            const user = await client.users.fetch(`${data.user}`)

            if(!data) return interaction.reply({ ephemeral: true, content: `Warn ID: \`${text}\` does not exist.` });
            if(data) {
                data.delete(async function() {
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setDescription(`Deleted **${user.tag}** warning \`${text}\``)
                            .setColor(client.config.color)
                            .setTimestamp()
                        ],
                        ephemeral: true
                    })
    
                    await modLog(interaction, new MessageEmbed()
                    .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({dynamic: true}))
                    .setDescription([
                       `**Member:** \`${user.tag}\` (${user.id})`,
                       `**Action:** Delete Warn *by button*`,
                       `**Warn ID:** \`${text}\``,
                       `**Reason:** Warn Deleted by using button.`,
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