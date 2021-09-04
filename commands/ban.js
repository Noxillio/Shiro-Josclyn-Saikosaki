const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, UserFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a target user.')
        .addUserOption(option =>
            option.setName('banuser')
                .setDescription('Ban the target user.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('banreason')
                .setDescription('Reason to ban target user.')  
                .setRequired(false)  
        ),
    async execute(interaction) {
        const banRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('banCancel')
                    .setLabel('Cancel')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('banConfirm')
                    .setLabel('Ban')
                    .setStyle('DANGER')
            )
        const banTarget = interaction.options.getMember('banuser');
        const banReason = interaction.options.getString('banreason');
        await interaction.reply({ content: "Set!", components: [banRow], ephemeral: true });
    }
}