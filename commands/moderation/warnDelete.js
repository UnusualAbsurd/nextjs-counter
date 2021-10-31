const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("../../models/Users");
const { modLog } = require("../../functions/guild/modlog");

module.exports = {
  name: "deletewarn",
  aliases: ["delwarn"],
  permissions: ["MANAGE_ROLES"],
  description: "Delete a users warning.",
  category: "moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, errorMsg) {
    if (!args.length) return errorMsg("Missing `WarnID`.");

    const data = await db
      .findOne({ guild: message.guildId, _id: args[0] })
      .catch(() => {});
    if (!data)
      return errorMsg(`Couldn't find a warn with the ID of \`${args[0]}\``);

    const reason = args.slice(1).join(" ") || "No Reason Provided";

    if (data) {
      let user = await client.users.fetch(data.user);
      if (!user) user = "Deleted User";

      data.delete(async function () {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(`Deleted **${user.tag}** warning \`${args[0]}\``)
              .setColor(client.config.color)
              .setTimestamp(),
          ],
        });

        await modLog(
          message,
          new MessageEmbed()
            .setAuthor(
              `${message.author.tag} (${message.author.id})`,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              [
                `**Member:** \`${user.tag}\` (${user.id})`,
                `**Action:** [Delete Warn](${message.url})`,
                `**Warn ID:** \`${args[0]}\``,
                `**Reason:** ${reason}`,
                ` `,
                `Date: <t:${Math.floor(Date.now() / 1000)}:D>`,
              ].join("\n")
            )
            .setColor(client.config.color)
        );
      });
    }
  },
};
