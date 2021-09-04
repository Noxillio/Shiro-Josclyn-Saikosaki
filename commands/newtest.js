const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newtest')
        .setDescription('Vital test command.')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('The target user.')
                .setRequired(true)    
        ),
    async execute(interaction, option) {
        const number = option.getNumber('num');
        await interaction.reply(`Target number selected: \`${number}\``);
    }
}