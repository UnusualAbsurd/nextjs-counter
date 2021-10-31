const chalk = require("chalk");
const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  if (client.ws.status === 0) var status = 200;
  console.log(`${chalk.greenBright("[Client Connection]")} Status: ${status}`);

  setInterval(() => {
    const mc = [];

    client.guilds.cache.forEach((guild) => {
      mc.push(guild.memberCount);
    });

    client.user.setActivity(`-help | ${mc.reduce((acc, guildMc) => acc + guildMc, 0)} Members`, { type: "PLAYING" });

  }, 10 * 1000);
};
