const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("../../models/Guilds");
const { newGuild } = require("../../functions/guild/createGuild");

module.exports = {
  name: "setprefix",
  userPermissions: ["ADMINISTRATOR"],
  description: "Set the prefix of the bot!",
  options: [
    {
      name: "prefix",
      description: "The new prefix you want as",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args) {
    const prefix = interaction.options.getString("prefix").trim().split(/ +/g);

    const data = await db.findOne({ guild: interaction.guildId });
    if (!data) await newGuild(interaction.guildId);

    data.prefix = prefix[0];
    data.save(function () {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `Successfully changed **${interaction.guild.name}** prefix into \`${prefix[0]}\``
            )
            .setTimestamp()
            .setColor(process.env.color),
        ],
      });
    });
  },
};
