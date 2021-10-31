const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "autorole",
  permissions: ["ADMINISTRATOR"],
  description: "The auto-role system the bot has!",
  category: "config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, errorMsg) {
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(process.env.color)
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setDescription(
            `Auto-Role system setup is using the \`/autorole <sub_command>\`! Please setup the auto-role system by typing \`/autorole\` and view the options you want to set!`
          ),
      ],
    });
  },
};
