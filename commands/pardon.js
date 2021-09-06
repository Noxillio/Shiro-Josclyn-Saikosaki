const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pardon')
        .setDescription('Pardons (unban) the target user.')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('ID of target user.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for pardon.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const author = interaction.member;
        const currentGuild = interaction.guild;
        const userId = interaction.options.getString('id');
        const pardonReason = interaction.options.getString('reason');
        // const targetUser = interaction.guild.members.resolveId(userId);

        if (currentGuild.available) {
            if (author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const pardonRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('pardonCancel')
                            .setLabel('Cancel')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('pardonConfirm')
                            .setLabel('Confirm')
                            .setStyle('PRIMARY')
                    )
                await interaction.reply({ content: `Are you sure you want to pardon (unban) **${userId}**?`, components: [pardonRow], ephemeral: true });

                // Button interaction.
                const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

                collector.on('collect', async i => {
                    if (i.customId === 'pardonCancel') {
                        const pardonRowCancelled = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('pardonCancelled')
                                    .setLabel('Cancel')
                                    .setStyle('SUCCESS')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId('pardonDisabled')
                                    .setLabel('Confirm')
                                    .setStyle('SECONDARY')
                                    .setDisabled(true)
                            )
                        await i.update({ content: `You have cancelled this action (pardon/unban)!\nTarget user: ${userId}`, components: [pardonRowCancelled], ephemeral: true });
                    }
                    else if (i.customId === 'pardonConfirm') {
                        const pardonRowConfirmed = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('pardonCancelDisabled')
                                    .setLabel('Cancel')
                                    .setStyle('SECONDARY')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId('pardonConfirmed')
                                    .setLabel('Pardoned/Unbanned')
                                    .setStyle('SUCCESS')
                                    .setDisabled(true)
                            )
                        try {
                            await interaction.guild.members.unban(userId, [`${pardonReason} | Pardoned by ${author}`] );
                            await i.update({ content: `You have pardoned/unbanned ${userId}!\nReason: ${pardonReason}`, components: [pardonRowConfirmed], ephemeral: true });
                        } catch (error) {
                            return i.update(`Failed to pardon/unban **${userId}**!\nError: ${error}`)
                        }
                    }
                });
            } else if (!author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                await interaction.reply({ content: `You (${author}) do not have permssion (\`BAN_MEMBERS\`) to execute this command!` });
            }
        } else if (!currentGuild.available) {
            return null;
        }
    }
}