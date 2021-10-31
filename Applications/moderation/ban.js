const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { modLog } = require("../../functions/guild/modlog");

module.exports = {
  name: "ban",
  userPermissions: ["BAN_MEMBERS"],
  description: "Ban a user from your server. 🔨",
  options: [
    {
      name: "user",
      description: "The user that you want to ban",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "The reason that you want to ban the user",
      type: "STRING",
      required: false,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args, errorMsg) {
    const user = interaction.options.getMember("user");
    const reason =
      interaction.options.getString("reason") || "No Reason Provided";

    if (
      interaction.member.roles.highest.position <= user.roles.highest.position
    )
      return errorMsg("You cannot ban users with higher role than you!");
    if (!user.bannable) return errorMsg("Couldn't ban that member.");

    user
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You have been banned from **${interaction.guild.name}**`
            ),
        ],
      })
      .catch(() => {});

    await interaction
      .reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Successfully banned **${user.user.tag}**`)
            .setTimestamp(),
        ],
      })
      .then(() => user.ban({ reason }));

    modLog(
      interaction,
      new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(
          `${interaction.user.tag} (${interaction.user.id})`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          [
            `**Member:** \`${user.user.tag}\` (${user.id})`,
            `**Action:** Ban`,
            `**Reason:** ${reason}`,
            ` `,
            `Date: <t:${Math.floor(Date.now() / 1002)}:D>`,
          ].join("\n")
        )
    ).catch(() => {});
  },
};
