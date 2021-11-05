const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meminfo')
        .setDescription('Retrieves information about the author (user executing the slash command - SJS).')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const author = interaction.member;
        const targetMember = interaction.options.getMember('user');
        if (interaction.guild.available) {
            const infoEmbed = new MessageEmbed()
                .setTitle(targetMember.user.tag)
                .setDescription(`User ID: \`${targetMember.id}\`\nAccount creation: \`${targetMember.user.createdAt}\`\nBannable: \`${targetMember.bannable}\`\nJoined server: \`${targetMember.joinedAt}\`\nKickable: \`${targetMember.kickable}\`\nManageable: \`${targetMember.manageable}\``)
                .setColor(targetMember.displayHexColor)
                .setThumbnail(targetMember.displayAvatarURL)

            await interaction.reply({ content: "Success!", embeds: [infoEmbed], ephemeral: true });
        }
        else if (!interaction.guild.available) {
            interaction.reply({ content: 'Error: The current server may be available at the moment.', ephemeral: true });
        }
    }
}