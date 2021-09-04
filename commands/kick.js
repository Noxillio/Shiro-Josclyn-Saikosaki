const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick the specified user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const notReadyEmbed = new MessageEmbed()
            .setTitle(':x: | Error: Not Ready')
            .setDescription('This command is not quite ready.')
        await interaction.reply({ content: "Notice!", embeds: [notReadyEmbed] })
    }
}