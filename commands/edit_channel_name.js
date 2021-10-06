const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit_channel_name')
        .setDescription('Edit server/member data.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Target channel.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The channel\'s new name.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const options = interaction.options;
        const targetChannel = options.getChannel('channel');
        const channelName = options.getString('name');

        // Embeds
        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Channel name has been updated to **${channelName}**.`)
            .setColor('#c21313')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 512 })}`)
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`Error - The target guild may be unavailable!`)
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const embedMissingPermissions = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`You (${currentMember}) are missing permission(s) to execute this command!`)
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        if (currentGuild.available) {
            if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                try {
                    await targetChannel.edit({ name: channelName, reason: `Updated by ${currentUser.tag} (${currentUser.id})` })
                    await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
                } catch (error) {
                    await interaction.reply({ content: `Suzuko failed with:\n- ${error}`, ephemeral: true });
                }
            } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                await interaction.reply({ content: null, embeds: [embedMissingPermissions], ephemeral: true });
            }
        } else if (!currentGuild.available) {
            await interaction.reply({ content: null, embeds: [embedFailure], ephemeral: true });
        }
    }
}