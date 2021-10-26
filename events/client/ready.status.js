const chalk = require('chalk');
const { Client } = require('discord.js')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    if(client.ws.status === 0) var status = 200
    console.log(`${chalk.greenBright('[Client Connection]')} Status: ${status}`);

    setInterval(() => client.user.setActivity(`${client.guilds.cache.size} servers | -help`, { type: "WATCHING" }), 10 * 1000)
    
}