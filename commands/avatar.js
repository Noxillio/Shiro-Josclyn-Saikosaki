const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Reveal your own avatar as an image.'),
    async execute(interaction) {
        const authorAvatar = interaction.user.displayAvatarURL();

        // Embed
        const avatarEmbed = new MessageEmbed()
            .setTitle(interaction.user.tag)
            .setColor('#c21313')
            .setImage(authorAvatar)
        await interaction.reply({ content: "Set!", embeds: [avatarEmbed] });
    }
}