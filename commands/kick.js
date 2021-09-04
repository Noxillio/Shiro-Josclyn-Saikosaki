const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, GuildMember } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick the specified user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking.')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (interaction.guild.available === true) {
            const kickTarget = interaction.options.getMember('user');
            const kickReason = interaction.options.getString('reason');

            await interaction.guild.members.kick(kickTarget, [kickReason] );
            const kickEmbed = new MessageEmbed()
                .setTitle(':white_check_mark: | Success!')
                .setDescription(`**${kickTarget}** has been kicked successfully from the server!`)
            await interaction.reply({ content: "Notice!", embeds: [kickEmbed], ephemeral: true });
        } else {
            await interaction.reply('Error: The server may be unavilable.')
        }
    }
}