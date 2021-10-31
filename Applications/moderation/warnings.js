const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("../../models/Users");

module.exports = {
  name: "warnings",
  description: "Display warnings of a user!",
  options: [
    {
      name: "user",
      description: "The user that you want to see the warnings of",
      type: "USER",
      required: false,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args) {
    const user = interaction.options.getMember("user") || interaction.member;

    const data = await db.find({ guild: interaction.guildId, user: user.id });
    if (!data?.length)
      return interaction.reply(
        `**${user.user.tag}** does not have any warnings in this server.`
      );

    const warns = data
      .map((w) => {
        const moderator =
          interaction.guild.members.cache.get(`${w.moderator}`) ||
          "User has left";
        return [
          `ID: \`${w._id}\` | Moderator: \`${moderator.user.tag}\``,
          `Reason: ${w.reason} - <t:${w.timestamp}:D>`,
        ].join("\n");
      })
      .join("\n\n");

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            `${user.user.tag} Warnings`,
            user.displayAvatarURL({ dynamic: true })
          )
          .setColor(process.env.color)
          .setDescription(`${await warns}`)
          .setTimestamp(),
      ],
    });
  },
};
