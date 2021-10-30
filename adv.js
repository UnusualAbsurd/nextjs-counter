const chalk = require('chalk');
const discord = require('discord.js');

const client = new discord.Client({
    intents: 14023
})

client.commands = new discord.Collection();
client.slashCommands = new discord.Collection();
client.config = require('./config.json');

['event_handler', "commands_handler"].forEach((file) => {
    require(`./handlers/${file}`)(client)
});
require('./web/server')(client)

const mongoose = require('mongoose')
mongoose.connect(`${client.config.mongodb}`)
.then(function(m) {
    console.log(`${chalk.blueBright("[Mongoose Connection]")} ReadyState: ${m.connection.readyState}`)

}).catch((e) => console.error(chalk.redBright(e)))

client.on('error', error => {
    console.error(`${chalk.redBright('[Client Error]')} ${error.message}`)

})

process.on('unhandledRejection', error => {
    console.error(`${chalk.redBright('[Project Error]')} ${error.message}`)
    console.error(`${chalk.redBright('[Project Error]')} Stack: ${error.stack}`)
})

client.login(client.config.token).catch((e) => console.error(`${chalk.redBright("[Client Login Error]")} ${e.message}`))