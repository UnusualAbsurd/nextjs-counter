const { Client, Message, MessageEmbed } = require("discord.js");
const { newGuild } = require("../../functions/guild/createGuild");
const db = require("../../models/Guilds");

module.exports = {
  name: "modlogs",
  aliases: ["modlog"],
  permissions: ["MANAGE_GUILD"],
  description: "Set the mod-logs channel for the server!",
  category: "config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, errorMsg) {
    let ch = message.mentions.channels.first();

    if (!ch)
      return errorMsg("Couldn't find channel " + `\`${args[0] || "null"}\``);
    if (!ch.isText()) return errorMsg(`${ch} must be a \`TEXT_CHANNEL\``);

    const data = await db.findOne({ guild: message.guildId });
    if (!data) await newGuild(message.guildId);

    if (data?.modlog === ch.id)
      return errorMsg(`<#${ch.id}> is already your modlog!`);
    data.modlog = ch.id;
    data.save(function () {
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(process.env.color)
            .setDescription(
              `Successfully set **${message.guild.name}** mod-logs as <#${ch.id}>`
            )
            .setTimestamp(),
        ],
      });
    });
  },
};
