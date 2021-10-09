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
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Keep output private?')
                .setRequired(true) 
        )
        .addStringOption(option =>
            option.setName('banreason')
                .setDescription('Reason to ban target user.')  
                .setRequired(false)  
        ),
    async execute(interaction) {
        if (interaction.guild.available) {
            const shiroSaikosaki = interaction.client.user;
            const currentGuild = interaction.guild;
            const banTarget = interaction.options.getMember('banuser');
            const banReason = interaction.options.getString('banreason');
            const isEphemeral = interaction.options.getBoolean('ephemeral');
            const currentUser = interaction.user;
            const currentMember = interaction.member;

            // Embeds
            const embedTargetBanReason = new MessageEmbed()
                .setTitle('To Be Advised!')
                .setDescription(`You have been banned from **${currentGuild.name}**!\nReason: ${banReason}`)
                .setColor('#c21313')
                .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
                .setImage('https://i.ibb.co/HBKzzgq/GAME.gif')

            if (currentMember.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
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
                await interaction.reply({ content: `Are you sure you want to ban ${banTarget}?\nReason: ${banReason}`, components: [banRow], ephemeral: isEphemeral });
            }
            else if (!currentMember.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const banEmbedFail = new MessageEmbed()
                    .setTitle('Notice!')
                    .setDescription(`An error has occurred!\nYou (${currentUser}) do not have the proper permission(s) (\`BAN_MEMBERS\`) to execute this command!`)
                await interaction.reply({ content: "Notice!", embeds: [banEmbedFail], ephemeral: isEphemeral });
            }

            // Button interaction

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'banCancel') {
                    const banRowCancelled = new MessageActionRow()
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
                    await i.update({ content: `You have cancelled this action (ban)!\nTarget user: ${banTarget}`, components: [banRowCancelled], ephemeral: isEphemeral });
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
                        try {
                            await banTarget.send({ content: null, embeds: [embedTargetBanReason] });
                        } catch (errorTwo) {
                            null;
                        } finally {
                            await interaction.guild.members.ban(banTarget, { reason: `${banReason} | Banned by ${currentUser.tag} (${currentUser.id})` });
                            await i.update({ content: `You have banned ${banTarget}!\nReason: ${banReason}`, components: [banRowConfirmed], ephemeral: isEphemeral });;
                        }
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