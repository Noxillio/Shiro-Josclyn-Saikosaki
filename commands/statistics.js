const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statistics')
        .setDescription('Statistics of the client (bot).'),
    async execute(interaction) {
        const guildMember = interaction.member;

        // Embed
        const statisticsEmbedNotReady = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription(`${guildMember}, sorry, this command is not ready yet!`)
            .setColor('#ff0000')
        await interaction.reply({ content: "[]", embeds: [statisticsEmbedNotReady], ephemeral: true });
    }
}