const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Sets the channel slow-mode.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Target channel.')
                .setRequired(true)    
        )
        .addIntegerOption(option =>
            option.setName('integer')
                .setDescription('A number.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentUser = interaction.user;
        const currentMember = interaction.member;
        const targetChannel = interaction.options.getChannel('channel');
        const rateLimit = interaction.options.getInteger('integer');

        // Embeds
        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Channel (${targetChannel}) rate limit has been updated to ${rateLimit}`)
            .setColor('#00ff00')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`Could not update channel (${targetChannel})!`)
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const embedMissingPermissions = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`You (${currentMember}) are missing permission(s) (\`MANAGE_CHANNELS\`)!`)
            .setColor('#00ff00')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            try {
                null
            } catch (error) {
                await interaction.reply({ content: `Error - ${error}`, embeds: [embedFailure], ephemeral: true });
            }
            await interaction.channel.edit({ rateLimitPerUser: rateLimit });
            await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermissions], ephemeral: true });
        }
    }
}