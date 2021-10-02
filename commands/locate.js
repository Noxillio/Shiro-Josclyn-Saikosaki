const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const trusted = ["635673822934204417", "681898763249254463"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('locate')
        .setDescription('N/A - [Exclusive]')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('User ID')
                .setRequired(true)
        ),
    async execute(interaction) {
        const allGuilds = interaction.client.guilds.cache.map(guild => guild);
        const currentUser = interaction.user;
        const userId = interaction.options.getString('id');

        try {
            for (const user of trusted) {
                if (currentUser.id === user) {
                    const targetUser = interaction.client.users.cache.get(userId);

                    // Loop through all guilds.
                    for (const guilds of allGuilds) {
                        if (guilds.members.cache.filter(user => user.id === targetUser.id)) {
                            await interaction.channel.send(`${guilds} (\`${guilds.id}\`)`);
                            await sleep(2500);
                        }
                    }
                }
            }
        } catch (error) {
            await interaction.reply({ content: `Error - ${error}`, ephemeral: true });
        }
    }
}