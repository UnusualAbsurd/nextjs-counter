const Discord = require('discord.js')
const db = require('../../models/AutoRole')
const chalk = require('chalk')

/**
* @param {Discord.Client} client
* @param {Discord.GuildMember} user
*/
module.exports = async(client, user) => {

    console.log('user')

    const data = await db.find({ guild: user.guild.id });
    if(!data?.length) return;

    if(data) {
        data.forEach(role => {
            user.roles.add(role.role).catch(() => {});
        })
    }
    

}