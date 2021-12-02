const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report server (abuse of Discord bot).')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Examples: Abusing bot commands, spam, malicious intentions, etc. [Provide evidence.]')
                .setRequired(true)
        ),
    async execute(interaction) {
        const developer = interaction.client.users.cache.get('779799406412693545');
        const currentGuild = interaction.guild;
        const currentUser = interaction.user;
        const shiroSaikosaki = interaction.client.user;
        const reason = interaction.options.getString('reason');

        // Embeds
        const choiceEmbed = new MessageEmbed()
            .setTitle('Are you sure you want to proceed?')
            .setDescription(`By reporting this guild, you acknowledge that the situation is not only serious, but can also blacklist your Discord account from using the command again if the report is false.\nProceed if:\n- Server owner or administrator(s), and/or moderator(s) abused commands.\n- Server owner, administrator(s), and/or moderator(s) refuse to take action to prevent their members from spamming the bot\'s commands.\n\nYour reason (and maybe evidence? Provide links of screenshots or videos as evidence.):\n- ${reason}`)
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)
        const reportCanceledEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: | Canceled!')
            .setDescription(`Your report has been successfully canceled, ${currentUser}!`)
            .setColor('#00ff00')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)
        const reportConfirmedEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: | Confirmed!')
            .setDescription(`Your report has been successfully submitted, ${currentUser}!`)
            .setColor('#008000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)
        const guildUnavailableEmbed = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription('The current guild seems to be unavailable at the moment, try again later!')
            .setColor('#ff0000')
            .setThumbnail('https://i.ibb.co/h8GCnD3/unavailable.png', { format: "png", size: 512 })
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)
        const ownerEmbed = new MessageEmbed()
            .setTitle('-!- Report -!-')
            .setDescription(`Reported Discord (server): **${currentGuild.name}** (\`${currentGuild.id}\`)\nDiscord (server) owner: <@${currentGuild.ownerId}> (\`${currentGuild.ownerId}\`)\nReporter: ${currentUser.tag} (\`${currentUser.id}\`)\nReason: ${reason}`)
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)

        if (currentGuild.available) {
            const reportRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('reportCancel')
                        .setLabel('Cancel')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('reportConfirm')
                        .setLabel('Confirm')
                        .setStyle('DANGER')
                )
            await interaction.reply({ content: null, embeds: [choiceEmbed], components: [reportRow], ephemeral: true });

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'reportCancel') {
                    const reportRowCancelled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('reportCancelled')
                                .setLabel('Canceled')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('reportDisabled')
                                .setLabel('Confirm')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    await i.update({ content: null, embeds: [reportCanceledEmbed], components: [reportRowCancelled], ephemeral: true });
                }
                else if (i.customId === 'reportConfirm') {
                    const reportRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('reportCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('reportConfirmed')
                                .setLabel('Reported')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    try {
                        await developer.send({ content: null, embeds: [ownerEmbed] });
                        await i.update({ contnat: null, embeds: [reportConfirmedEmbed], components: [reportRowConfirmed], ephemeral: true });
                    } catch (error) {
                        return i.update(`Failed to report **${currentGuild.name}**!\nError - ${error}`)
                    }
                }
            });
        } else if (!currentGuild.available) {
            interaction.reply({ content: null, embeds: [guildUnavailableEmbed], ephemeral: true });
        }
    }
}