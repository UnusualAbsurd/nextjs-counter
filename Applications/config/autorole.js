const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("../../models/AutoRole");

module.exports = {
  name: "autorole",
  userPermissions: ["MANAGE_GUILD"],
  description: "ADV Discord Bot Auto Role System",
  options: [
    {
      name: "add",
      description: "Add a role into your guild auto-role system",
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: "The role that you want to add",
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove a role from your guild auto-role system",
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: "The role that you want to remove",
          type: "ROLE",
          required: true,
        },
      ],
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async execute(client, interaction, args) {
    const [subcommand] = args;
    const role = interaction.options.getRole("role");
    const data = await db.findOne({
      guild: interaction.guildId,
      role: role.id,
    });

    if (subcommand === "add") {
      if (data)
        return interaction.reply({
          ephemeral: true,
          content: `You already have <@&${role.id}> in the auto-role system.`,
        });
      else {
        new db({
          guild: interaction.guildId,
          role: role.id,
        }).save(function () {
          interaction.reply({
            content: `Successfully added <@&${role.id}> into the auto-role system.`,
            ephemeral: true,
          });
        });
      }
    }

    if (subcommand === "remove") {
      if (!data)
        return interaction.reply({
          ephemeral: true,
          content: `You don't have <@&${role.id}> in the auto-role system.`,
        });
      else {
        data.delete(function () {
          interaction.reply({
            content: `Successfully removed <@&${role.id}> from the auto-role system.`,
            ephemeral: true,
          });
        });
      }
    }
  },
};
