const Discord = require("discord.js");
const { isInvite } = require("../../functions/moderation/isInvite");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
module.exports = async (client, message) => {
  const { guild, author, content } = message;
  
  if (message.content?.includes("discord.gg")) {
    const code = content.split("discord.gg")[1].replace("/", '');


    console.log(`CODE: ` + code);

    const isOurInvite = await isInvite(guild, code);
    console.log(isOurInvite);
    if (!isOurInvite) {
      await message.delete().catch(() => {});
      message.channel.send({
        content: `<@!${author.id}>, you cannot send invite links in this server!`,
      });
    }
  }
};
