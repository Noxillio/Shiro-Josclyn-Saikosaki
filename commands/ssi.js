const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ssi')
        .setDescription('Sends the support server invite.'),
    async execute(interaction) {
        await interaction.reply({ content: "Support server: https://discord.com/invite/tkMMwPY\nDuring testing hours, you can test out some work-in-progress commands!", ephemeral: true });
    }
}