const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { newGuild } = require("../../functions/guild/createGuild");
const db = require("../../models/Guilds");

module.exports = {
  name: "modlog",
  description: "Set the modlog channel for the server",
  userPermissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "channel",
      description: "The channel that you want to set the modlog as",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args) {
    const ch = interaction.options.getChannel("channel");

    const data = await db.findOne({ guild: interaction.guildId });
    if (!data) await newGuild(interaction.guildId);

    if (data?.modlog === ch.id)
      return interaction.reply({
        ephemeral: true,
        content: `<#${ch.id}> is already your modlog!`,
      });
    data.modlog = ch.id;
    data.save(function () {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(
              `Successfully set **${message.guild.name}** mod-logs as <#${ch.id}>`
            )
            .setTimestamp(),
        ],
      });
    });
  },
};
