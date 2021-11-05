const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, VoiceBroadcast } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_channel')
        .setDescription('Create a new channel.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of channel.')
                .setRequired(true)
                .addChoice('Stage', 'STAGE')
                .addChoice('Text', 'TEXT')
                .addChoice('Voice', 'VOICE')  
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of channel.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('nsfw')
                .setDescription('Mark channel as NSFW (Text channel)?')
                .setRequired(false)
                .addChoice('True', 'true')
                .addChoice('False', 'false')    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const channelType = interaction.options.getString('type');
        const channelName = interaction.options.getString('name');
        const channelNsfwOption = interaction.options.getString('nsfw');

        const embedFailureUnknown = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`The command failed.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`New channel:\n- Channel name: **${channelName}**\n- Channel type: \`${channelType}\``)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedMissingPermissions = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: You (${currentMember}) do not have the following permission(s):\n- \`MANAGE_CHANNELS\``)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            try {
                if (channelType === 'STAGE') {
                    await currentGuild.channels.create(channelName, { type: 'GUILD_STAGE_VOICE', reason: `Created by ${currentUser.tag}.` });
                } else if (channelType === 'TEXT') {
                    await currentGuild.channels.create(channelName, { type: 'GUILD_TEXT', nsfw: channelNsfwOption, reason: `Created by ${currentUser.tag}.` });
                } else if (channelType === 'VOICE') {
                    await currentGuild.channels.create(channelName, { type: 'GUILD_VOICE', reason: `Created by ${currentUser.tag}.` });
                } else {
                    await interaction.reply({ content: `Interaction failed -- reason unknown.` });
                }

                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
            } catch (error) {
                const embedMissingPermissions = new MessageEmbed()
                    .setTitle(':x: | Failure!')
                    .setDescription(`The command failed due to the following error:\n- \`${error}\``)
                    .setColor('#ff0000')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedFailureError], ephemeral: true });
            }
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermissions], ephemeral: true });
        }
    }
}