const discord = require('discord.js');
const { glob } = require('glob')
const { promisify } = require('util')
const globPromise = promisify(glob)

/**
 * 
 * @param {discord.Client} client 
 */
module.exports = async(client) => {



    /**
     * Commands Handler
     */
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((val) => {
        const file = require(val);

        const splitted = val.split("/")
        const dir = splitted[splitted.length - 2];

        if(file.name) {
            const prop = { dir, ...file };
            client.commands.set(file.name, prop)
        }

    })

    /**
     * Application Commands
     */

    const app_commands = [];
    const appCommands = await globPromise(`${process.cwd()}/Applications/*/*.js`);

    appCommands.map((val) => {
        const file = require(val);
        if(!file?.name) return;

        client.slashCommands.set(file.name, file);

        if(["MESSAGE", "USER"].includes(file.type)) delete file.description;
        app_commands.push(file)
    })

    client.on('ready', async() => {
        // await client.application.commands.set(app_commands);
        await client.guilds.cache.get('869207783025836083').commands.set(app_commands)
    })



}