const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("../../models/AntiScam");

module.exports = {
  name: "antiscam",
  description: "Make the bot antiscam links, that are common in discord",
  options: [
    {
      name: "status",
      description: "Pick if you would like to disable or enable it",
      type: "BOOLEAN",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args) {
    const status = interaction.options.getBoolean("status");

    if (status === true) {
      const data = await db.findOne({ guild: interaction.guildId });
      if (!data)
        new db({
          guild: interaction.guildId,
          status: true,
        }).save(function () {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor(process.env.color)
                .setDescription(
                  "Successfully enabled anti-scam links in " +
                    `**${interaction.guild.name}**`
                ),
            ],
          });
        });

      if (data) {
        if (data.status === true)
          return interaction.reply({
            content: "You already enabled anti-scam links in the server!",
            ephemeral: true,
          });
        else {
          data.status = true;
          data.save(function () {
            interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(process.env.color)
                  .setDescription(
                    "Successfully enabled anti-scam links in " +
                      `**${interaction.guild.name}**`
                  ),
              ],
            });
          });
        }
      }
    }

    if (status === false) {
      const data = await db.findOne({ guild: interaction.guildId });
      if (!data)
        new db({
          guild: interaction.guildId,
          status: false,
        }).save(function () {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor(process.env.color)
                .setDescription(
                  "Successfully disabled anti-scam links in " +
                    `**${interaction.guild.name}**`
                ),
            ],
          });
        });

      if (data) {
        if (data.status === false)
          return interaction.reply({
            content: "You already disabled anti-scam links in the server!",
            ephemeral: true,
          });
        else {
          data.status = false;
          data.save(function () {
            interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(process.env.color)
                  .setDescription(
                    "Successfully disabled anti-scam links in " +
                      `**${interaction.guild.name}**`
                  ),
              ],
            });
          });
        }
      }
    }
  },
};
