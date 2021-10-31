const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const fetch = require("node-fetch").default;

module.exports = {
  name: "search",
  description: "Search something in google!",
  options: [
    {
      name: "image",
      description: "Search for an image in google!",
      type: "SUB_COMMAND",
      options: [
        {
          name: "query",
          description: "The query that you want to search as",
          type: "STRING",
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
    const query = interaction.options.getString("query");

    try {
      await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.google}&cx=${process.env.cx}&q=${query}&searchType=image`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (!res.items?.length)
            return interaction.reply({
              content: "No results for `" + args.join(" ") + "`",
              ephemeral: true,
            });

          const random = Math.floor(Math.random() * res.items.length);

          interaction.reply({
            files: [
              new MessageAttachment(
                `${res.items[random].link}`,
                `${res.items[random].title.trim().split(/ +/g)[0]}.png`
              ),
            ],
          });
        });
    } catch (e) {
      interaction.reply({ content: e.message, ephemeral: true });
    }
  },
};
