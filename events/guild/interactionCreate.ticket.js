const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js/src/index.js');

/**
* @param {Discord.Client} client
* @param {Discord.Interaction} interaction
*/
module.exports = async(client, interaction) => {
    if(interaction.isButton()) {
        if(interaction.message.author.id !== client.user.id) return;

        if(interaction.customId === 'ticket') {
    
          const ch = await interaction.guild.channels.create(`ticket-${Math.floor(1000 + Math.random() * 9000)}`, {
                topic: interaction.user.id,
          })

          interaction.reply({ content: "Successfullly created your ticket - <#" + ch.id + ">", ephemeral: true })
          ch.send({ embeds: [new MessageEmbed().setColor("GREEN").setTimestamp().setDescription(`<@!${interaction.user.id}>, thank you for creating a ticket! The support theme will assits you now! \:)`)] });
        }
    }
}