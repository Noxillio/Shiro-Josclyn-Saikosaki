const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, UserFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a target user.')
        .addUserOption(option =>
            option.setName('banuser')
                .setDescription('Ban the target user (SJS).')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('banreason')
                .setDescription('Reason to ban target user.')  
                .setRequired(false)  
        ),
    async execute(interaction) {
        if (interaction.guild.available) {
            const banTarget = interaction.options.getMember('banuser');
            const banReason = interaction.options.getString('banreason');
            const author = interaction.member;
            if (author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
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
                await interaction.reply({ content: `Are you sure you want to ban ${banTarget}?\nReason: ${banReason}`, components: [banRow], ephemeral: true });
            }
            else if (!author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const banEmbedFail = new MessageEmbed()
                    .setTitle('Notice!')
                    .setDescription(`An error has occurred!\nYou (${author}) do not have the proper permission(s) (\`BAN_MEMBERS\`) to execute this command!`)
                await interaction.reply({ content: "Notice!", embeds: [banEmbedFail], ephemeral: true });
            }

            // Button interaction

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'banCancel') {
                    const banRowCanceled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('banCancelled')
                                .setLabel('Cancel')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('banDisabled')
                                .setLabel('Ban')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    await i.update({ content: `You have canceled this action (ban)!\nTarget user: ${banTarget}`, components: [banRowCanceled], ephemeral: true });
                }
                else if (i.customId === 'banConfirm') {
                    const banRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('banCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('banConfirmed')
                                .setLabel('Banned')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    try {
                        await interaction.guild.members.ban(banTarget, [`${banReason} | Banned by ${author}`] );
                        await i.update({ content: `You have banned ${banTarget}!\nReason: ${banReason}`, components: [banRowConfirmed], ephemeral: true });
                    } catch (error) {
                        return i.update(`Failed to ban **${banTarget}**!\nError: ${error}`)
                    }
                }
            });
        }
        else if (!interaction.guild.available) {
            await interaction.reply({ content: `An error has occurred! This guild may not be available at the moment or does not exist.`, ephemeral: true });
        }
    }
}