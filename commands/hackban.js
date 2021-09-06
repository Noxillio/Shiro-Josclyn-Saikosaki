const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { execute } = require('./pardon');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackban')
        .setDescription('Ban the specfied user (through their ID)')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Target user ID.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for ban.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const author = interaction.member;
        const currentGuild = interaction.guild;
        const userId = interaction.options.getString('id');
        const hackbanReason = interaction.options.getString('reason');

        if (currentGuild.available) {
            if (author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const hackbanRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('hackbanCancel')
                            .setLabel('Cancel')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('hackbanConfirm')
                            .setLabel('Affirmative')
                            .setStyle('DANGER')
                    )
                await interaction.reply({ content: `Are you sure you want to hack-ban the target user?\nUser ID: ${userId}`, components: [hackbanRow], ephemeral: true });

                const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

                collector.on('collect', async i => {
                    if (i.customId === 'hackbanCancel') {
                        const hackbanRowCancelled = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('hackbanCancelled')
                                    .setLabel('Cancelled')
                                    .setStyle('SUCCESS')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId('hackbanDisabled')
                                    .setLabel('Ban')
                                    .setStyle('DANGER')
                                    .setDisabled(true)
                            )
                        await i.update({ content: `You have cancelled this action (hack-ban)!\nTarget user: ${userId}`, components: [hackbanRowCancelled], ephemeral: true });
                    }
                    else if (i.customId === 'hackbanConfirm') {
                        const hackbanRowConfirmed = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('hackbanCancelDisabled')
                                    .setLabel('Cancel')
                                    .setStyle('SECONDARY')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId('hackbanConfirmed')
                                    .setLabel('Banned')
                                    .setStyle('DANGER')
                                    .setDisabled(true)
                            )
                        try {
                            await interaction.guild.members.ban(userId, [`${hackbanReason} | Banned by ${author}`] );
                            await i.update({ content: `You have banned ${userId}!\nReason: ${hackbanReason}`, components: [hackbanRowConfirmed], ephemeral: true });
                        } catch (error) {
                            return i.update(`Failed to ban **${userId}**!\nError: ${error}`)
                        }
                    }
                });
            } else if (!author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                await interaction.reply({ content: `You (${author}) do not have permission (\`BAN_MEMBERS\`) to execute this command.`, ephemeral: true });
            }
        } else if (!currentGuild.available) {
            return null;
        }
    }
}