const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meminfo')
        .setDescription('Retrieves information about the author (user executing the slash command).'),
    async execute(interaction) {
        const infoEmbed = new MessageEmbed()
            .setTitle(interaction.user.tag)
            .setDescription(`User ID: \`${interaction.member.id}\`\nAccount creation: \`${interaction.user.createdAt}\`\nBannable: \`${interaction.member.bannable}\`\nJoined server: \`${interaction.member.joinedAt}\`\nKickable: \`${interaction.member.kickable}\`\nManageable: \`${interaction.member.manageable}\``)
            .setColor(interaction.member.displayHexColor)
            .setThumbnail(interaction.user.displayAvatarURL)

        await interaction.reply({ content: "Success!", embeds: [infoEmbed] });
    }
}