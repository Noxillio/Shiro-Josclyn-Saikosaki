const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display your avatar or other users\' avatar.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target user.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const currentUser = interaction.user;
        const targetUser = interaction.options.getUser('user');

        if (targetUser !== null) {
            const avatarEmbedRegular = new MessageEmbed()
                .setTitle(`${targetUser.tag} | Static`)
                .setColor('#c21313')
                .setImage(targetUser.avatarURL({ format: "png", size: 1024 }))

            await interaction.reply({ content: null, embeds: [avatarEmbedRegular], ephemeral: true });
        } else if (targetUser === null) {
            const authorAvatarEmbed = new MessageEmbed()
                .setTitle(`${currentUser.tag} | Static (personal)`)
                .setColor('#c21313')
                .setImage(currentUser.avatarURL({ format: "png", size: 1024 }))
            await interaction.reply({ content: null, embeds: [authorAvatarEmbed], ephemeral: true });
        }
    }
}