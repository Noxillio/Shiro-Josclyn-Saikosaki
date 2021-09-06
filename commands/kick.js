const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, GuildMember } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick the specified user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user (SJS).')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const author = interaction.member;
        const kickTarget = interaction.options.getMember('user');
        const kickReason = interaction.options.getString('reason');
        if (interaction.guild.available === true) {
            if (author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const kickRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('kickCancel')
                            .setLabel('Cancel')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('kickConfirm')
                            .setLabel('Kick')
                            .setStyle('DANGER')
                    )
                await interaction.reply({ content: `Are you sure you want to kick **${kickTarget}**?\nReason: ${kickReason}`, components: [kickRow], ephemeral: true });
            }
            else if (!author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const kickEmbedFail = new MessageEmbed()
                    .setTitle('Notice!')
                    .setDescription(`An error has occurred!\nYou (${author}) do not have the proper permission(s) (\`KICK_MEMBERS\`) to execute this command!`)

                await interaction.reply({ content: "Notice!", embeds: [kickEmbedFail], ephemeral: true });
            }
            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'kickCancel') {
                    const kickRowCanceled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('kickCancelled')
                                .setLabel('Cancel')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('kickDisabled')
                                .setLabel('Kick')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    await i.update({ content: `You have canceled this action (kick)!\nTarget user: ${kickTarget}`, components: [kickRowCanceled] });
                }
                else if (i.customId === 'kickConfirm') {
                    const kickRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('kickCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('kickConfirmed')
                                .setLabel('Kicked')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    try {
                        await interaction.guild.members.kick(kickTarget, [`${kickReason} | Kicked by ${author}`] );
                        await i.update({ content: `You have kicked **${kickTarget}**!\nReason: ${kickReason}`, components: [kickRowConfirmed], ephemeral: true });
                    } catch (error) {
                        return i.update(`Failed to kick **${kickTarget}**!\nError: ${error}`)
                    }
                }
            });
        }
        else if (!interaction.guild.available) {
            await interaction.reply('Error: The server may be unavilable.')
        }
    }
}