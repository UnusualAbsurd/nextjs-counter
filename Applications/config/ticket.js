const { Client, CommandInteraction, MessageEmbed, MessageActionRow,MessageButton } = require('discord.js');

module.exports = {
    name: 'ticket',
    userPermissions: ["MANAGE_GUILD"],
    description: 'Ticket system of ADV Discord Bot',
    options: [
        {
            name: 'panel',
            description: "The ticket panel for the bot!",
            type: "SUB_COMMAND",
            options: [
                {name: 'channel', description: "The channel that you want to set the panel in", type: "CHANNEL", channelTypes: ['GUILD_TEXT'], required: true},
                {name: "title", description: "The embed title of the embed panel", type: "STRING", required: true },
                {name: "description", description: "The embed description of the embed panel", type: "STRING", required: true }
            ]
        }, // Panel End
        {
            name: 'role',
            type: "SUB_COMMAND_GROUP",
            description:"The support team role that can view the ticket!",
            options: [
               {
                 name: 'add',
                 description: "Add a role as the server support ticket team!",
                 type: "SUB_COMMAND",
                 options: [{ name: "role", description: "The role you want to add", type: "ROLE", required: true }]
               }, // Command Group Add 
            ],
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args       
     */
    async execute(client, interaction, args) {

        const description = interaction.options.getString("description");
        const title = interaction.options.getString("title")
        const channel = interaction.options.getChannel('channel');

        const [subcommand] = args;

        console.log(args)

        if(subcommand === 'panel') {
           const msg = await channel.send({
               embeds: [
                   new MessageEmbed()
                   .setColor(client.config.color)
                   .setDescription(`${description}`)
                   .setAuthor(`${title}`, interaction.guild.iconURL({dynamic: true}))
                   .setTimestamp()
                   .setFooter("Panel by: " + interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
               ],
               components: [new MessageActionRow().addComponents(new MessageButton().setLabel("Create a ticket").setStyle("SECONDARY").setCustomId('ticket').setEmoji("🎫"))]
           })

           interaction.reply({
               content: `Successfully created a panen in <#${channel.id}> - [Ticket Panel](${msg.url})`
           })
        }


    

    }
}