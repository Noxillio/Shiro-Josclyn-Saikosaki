const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');
const special = ['635673822934204417', '779799406412693545', '794101445485789254'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frfg')
        .setDescription('Force the bot to leave from target server.')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('The ID for the target server.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const author = interaction.user;
        const guildId = interaction.options.getString('id');
        const targetGuild = interaction.client.guilds.cache.get(guildId);

        if (author.id === '635673822934204417') {
            const leaveGuildRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('leaveCancel')
                        .setLabel('Cancel')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('leaveConfirm')
                        .setLabel('Affirmative')
                        .setStyle('DANGER')
                )
            await interaction.reply({ content: `Are you sure you want to remove this integration from **${targetGuild}**?`, components: [leaveGuildRow], ephemeral: true });

            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'leaveCancel') {
                    const leaveRowCancelled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('leaveCancelled')
                                .setLabel('Cancel')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('leaveDisabled')
                                .setLabel('Affirmative')
                                .setStyle('SECONDARY')
                                .setDisabled(true)
                        )
                    await i.update({ content: `You have cancelled this action (leave).`, components: [leaveRowCancelled] });
                }
                else if (i.customId === 'leaveConfirm') {
                    const leaveRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('leaveCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('leaveConfirmed')
                                .setLabel('Affirmative)')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    try {
                        await targetGuild.leave();
                        await i.update({ content: `The integration has been successfully removed.`, components: [leaveRowConfirmed], ephemeral: true });
                    } catch (error) {
                        i.update({ content: `Error - ${error}`, ephemeral: true });
                    }
                }
            });
        }
        else if (!author.id === '635673822934204417') {
            await interaction.reply({ content: "Error: Your account is not registered.", ephemeral: true });
        }
    }
}