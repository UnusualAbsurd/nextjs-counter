const { Client, Message, MessageEmbed } = require("discord.js");
const os = require("os");
const { commas } = require("number-prettier");
const ms = require("ms");

module.exports = {
  name: "stats",
  description: "View statistics of the bot!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(client.config.color)
          .setTimestamp()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .addField(`Servers`, `${commas(client.guilds.cache.size)}`, true)
          .addField(`Users`, `${commas(client.users.cache.size)}`, true)
          .addField(`Load Average`, `${os.loadavg().join(", ")}`, true)
          .addField(`Uptime`, `${ms(client.uptime, { long: true })}`, true)
          .setFooter(
            `Requested By: ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          ),
      ],
    });
  },
};
