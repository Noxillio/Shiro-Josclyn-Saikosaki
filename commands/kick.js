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
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Keep output private.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const kickTarget = interaction.options.getMember('user');
        const kickReason = interaction.options.getString('reason');
        const isEphemeral = interaction.options.getBoolean('ephemeral');

        // Embeds
        const embedTargetKickReason = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription(`You have been kicked from **${currentGuild.name}**!\n**Reason:** ${kickReason}`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage('https://i.ibb.co/HBKzzgq/GAME.gif')

        if (interaction.guild.available === true) {
            if (currentMember.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
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
                await interaction.reply({ content: `Are you sure you want to kick **${kickTarget}**?\nReason: ${kickReason}`, components: [kickRow], ephemeral: isEphemeral });
            }
            else if (!currentMember.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const kickEmbedFail = new MessageEmbed()
                    .setTitle('Notice!')
                    .setDescription(`An error has occurred!\nYou (${currentMember}) do not have the proper permission(s) (\`KICK_MEMBERS\`) to execute this command!`)

                await interaction.reply({ content: "Notice!", embeds: [kickEmbedFail], ephemeral: isEphemeral });
            }
            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'kickCancel') {
                    const kickRowCancelled = new MessageActionRow()
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
                    await i.update({ content: `You have cancelled this action (kick)!\nTarget user: ${kickTarget}`, components: [kickRowCancelled], ephemeral: isEphemeral });
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
                        try {
                            await kickTarget.send({ content: null, embeds: [embedTargetKickReason] });
                        } catch (errorTwo) {
                            null;
                        } finally {
                            await interaction.guild.members.kick(kickTarget, { reason: `${kickReason} | Kicked by ${currentUser.tag} (${currentUser.id})` });
                            await i.update({ content: `You have kicked **${kickTarget}**!\nReason: ${kickReason}`, components: [kickRowConfirmed], ephemeral: isEphemeral });
                        }
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