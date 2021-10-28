const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'help',
    description: 'Get list of the bots commands!',
    category: 'info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args, errorMsg, prefix) {
        
        let misc_option = {
            label: "Misc Commands",
            description: "Click to view misc commands",
            value: "misc",
            emoji: "<:8264_gil_thumb:902453758389280840>"
        }

        let info_option = {
            label: "Info Commands",
            description: "Click to view info commands",
            value: "info",
            emoji: "<:7890_gil_lol:902453758796115998>"
        }

        let mod_option = {
            label: 'Moderation Commands',
            description: "Click to view moderation commands",
            value: 'moderation',
            emoji: "<:6197_gil_eyes:902453758569623574>"
        }

        let config_data = {
            label: "Server Settings Commands",
            description: "Click to view server settings commands",
            value: "config",
            emoji: "<:7259_gil_salute:902453758947102791>"
        }

        let fun_option = {
            label: "Fun Commands",
            description: "Click to view fun commands",
            value: 'fun',
            emoji: "<:6400_gil_ree:902453758850650182>"
        }

        const placeholder = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
            .setMaxValues(1)
            .setPlaceholder('Select the command category you want to view!')
            .setCustomId("selection")
            .setOptions([
              mod_option,
              config_data,
              misc_option,
              fun_option,
              info_option
            ])
        ])
        const row = new MessageActionRow().addComponents([new MessageButton().setCustomId("search-command").setLabel("Search Command").setStyle("SECONDARY"), new MessageButton().setLabel("Search Slash Commands").setCustomId("search-slash").setStyle("SECONDARY")])

        const basic = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Help Panel`, client.user.displayAvatarURL())
        .addField('General Help', 
        [`Total Commands: [ **${client.commands.size}** ]`,`Invites: [\[ Admin \]](${client.config.invite.admin}) | [\[ Default \]](${client.config.invite.default})`,].join("\n"))
        .addField('Information', 
        [`> Servers: **${client.guilds.cache.size}**`, `> Users: **${client.users.cache.size}**`, `> Uptime: **${ms(client.uptime, { long: true })}**`].join("\n"))

        message.channel.send({embeds: [basic], components: [placeholder, row]});

        const misc_embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Misc Commands`, client.user.displayAvatarURL())

        const info_embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Info Commands`, client.user.displayAvatarURL())

        const mod_embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Moderation Commands`, client.user.displayAvatarURL())
        
        const config_embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Server Settings Commands`, client.user.displayAvatarURL())

        const fun_embed = new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(`${client.user.username}'s Fun Commands`, client.user.displayAvatarURL())

        var misc_array = [];
        var info_array = [];
        var mod_array = [];
        var config_array = [];
        var fun_array = [];
        

        client.commands.forEach((cmd) => {
            switch(cmd.category) {
                case 'misc':
                    misc_array.push(cmd);
                break
                case 'info':
                    info_array.push(cmd);
                break
                case 'moderation':
                    mod_array.push(cmd);
                break
                case 'config':
                    config_array.push(cmd);
                break
                case 'fun':
                    fun_array.push(cmd);
                break
            }
        })

        misc_array.forEach((cmd) => misc_embed.addField(`${prefix}${cmd.name}`, `<:Reply:887332969033912380> ${cmd.description || "No Description"}`))
        info_array.forEach((cmd) => info_embed.addField(`${prefix}${cmd.name}`, `<:Reply:887332969033912380> ${cmd.description || "No Description"}`))
        mod_array.forEach((cmd) => mod_embed.addField(`${prefix}${cmd.name}`, `<:Reply:887332969033912380> ${cmd.description || "No Description"}`))
        config_array.forEach((cmd) => config_embed.addField(`${prefix}${cmd.name}`, `<:Reply:887332969033912380> ${cmd.description || "No Description"}`))
        fun_array.forEach((cmd) => fun_embed.addField(`${prefix}${cmd.name}`, `<:Reply:887332969033912380> ${cmd.description || "No Description"}`))



        function select(interaction) {
            switch(interaction.values[0]) {
                case 'misc':
                    interaction.reply({ ephemeral: true, embeds: [misc_embed]})
                break
                case 'info':
                    interaction.reply({ ephemeral: true, embeds: [info_embed]})
                break
                case 'moderation':
                    interaction.reply({ ephemeral: true, embeds: [mod_embed]})
                break
                case 'config':
                    interaction.reply({ ephemeral: true, embeds: [config_embed]})
                break
                case 'fun':
                    interaction.reply({ ephemeral: true, embeds: [fun_embed]});
                break

            }
        }

        client.on('interactionCreate', async interaction => {
            if(interaction.isSelectMenu()) {
                if(interaction.message.author.id !== client.user.id) return;
                else {
                    select(interaction);
                }
            }
        })

    }
}