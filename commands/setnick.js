const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uun')
        .setDescription('Updates the target user\'s nickname (server-side)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The specified user.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('The nickname you want applied.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const author = interaction.member;
        const targetMember = interaction.options.getMember('user');
        const nickname = interaction.options.getString('nickname');

        if (author.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            const nicknameRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('nicknameCancel')
                        .setLabel('Cancel')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('nicknameConfirm')
                        .setLabel('Confirm')
                        .setStyle('SUCCESS')
                )
            
            await interaction.reply({ content: `Are you sure you want to update **${targetMember}\'s** nickname?\nSelected nickname: ${nickname}`, components: [nicknameRow], ephemeral: true });

            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'nicknameCancel') {
                    const nicknameRowCanceled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('nicknameCancelled')
                                .setLabel('Cancel')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('nicknameDisabled')
                                .setLabel('Confirm')
                                .setStyle('SECONDARY')
                                .setDisabled(true)
                        )
                    await i.update({ content: `You have canceled this action (nickname)!\nTarget user: ${targetMember}`, components: [nicknameRowCanceled] });
                }
                else if (i.customId === 'nicknameConfirm') {
                    const nicknameRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('nicknameCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('nicknameConfirmed')
                                .setLabel('Renamed')
                                .setStyle('SUCCESS')
                                .setDisabled(true)
                        )
                    try {
                        await interaction.guild.members.edit(targetMember, { nick: nickname } );
                        await i.update({ content: `You have updated **${targetMember}\'s nickname to: ${nickname}**`, components: [nicknameRowConfirmed], ephemeral: true });
                    } catch (error) {
                        return i.update(`Failed to apply nickname to **${targetMember}**!\nError: ${error}`)
                    }
                }
            });
        }
        else if (!author.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            interaction.reply({ content: `Error: You (${author}) are missing permission(s)! [\`MANAGE_NICKNAMES\`]`, ephemeral: true })
        }
    }
}