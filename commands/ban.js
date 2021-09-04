const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, UserFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a target user.'),
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
        await interaction.reply({ content: "Set!", components: [banRow], ephemeral: true });
    }
}