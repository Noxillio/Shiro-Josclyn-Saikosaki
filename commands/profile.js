const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Checks user profile (Experimental).')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const currentGuild = interaction.guild;
        const currentUser = interaction.user;

        // Embed
        const profileNotReadyEmbed = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription(`This command is not quite ready yet, ${currentUser}`)
            .setColor('#ff0000')
        // Send data.
        await interaction.reply({ content: null, embeds: [profileNotReadyEmbed], ephemeral: true });
    }
}