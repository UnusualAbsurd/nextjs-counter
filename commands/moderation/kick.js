const { Client, Message, MessageEmbed } = require("discord.js");
const { modLog } = require("../../functions/guild/modlog");

module.exports = {
  name: "kick",
  permissions: ["KICK_MEMBERS"],
  aliases: ["shoe"],
  description: "Kick a user from the server!",
  category: "moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, errorMsg) {
    let user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(`${args[0]}`).catch(() => {}));
    if (!user) return errorMsg(`Couldn't find user \`${args[0] || "null"}\``);

    if (message.member.roles.highest.position <= user.roles.highest.position)
      return errorMsg("You cannot kick users with higher role than you!");
    if (!user.kickable) return errorMsg("Couldn't kick that member.");

    const reason = args.slice(1).join(" ") || "No Reason Provided";

    message.channel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Successfully kicked **${user.user.tag}**`)
            .setTimestamp(),
        ],
      })
      .then(() => user.kick({ reason }));

    user
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You have been kicked from **${message.guild.name}**`
            ),
        ],
      })
      .catch(() => {});

    modLog(
      message,
      new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(
          `${message.author.tag} (${message.author.id})`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          [
            `**Member:** \`${user.user.tag}\` (${user.id})`,
            `**Action:** [Kick](${message.url})`,
            `**Reason:** ${reason}`,
            ` `,
            `Date: <t:${Math.floor(Date.now() / 1000)}:D>`,
          ].join("\n")
        )
    ).catch(() => {});
  },
};
