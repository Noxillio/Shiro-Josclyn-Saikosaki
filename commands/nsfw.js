const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('Updates the NSFW setting for the target channel.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The target channel.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const targetChannel = interaction.options.getChannel('channel');

        // Embeds
        const embedSuccessTrue = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Channel (${targetChannel}) is now marked as **NSFW**!`)
            .setColor('#aa7000')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 512 })}`)
        const embedSuccessFalse = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Channel (${targetChannel}) is no longer marked as **NSFW**!`)
            .setColor('#00ff00')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 512 })}`)
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`Error - Unknown (Unavailable).`)
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const embedMissingPermissions = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`You (${currentMember}) do not have the required permission(s) to execute this command.`)
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        if (currentGuild.available) {
            if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                if (!targetChannel.nsfw) {
                    await targetChannel.edit({ nsfw: true });
                    await interaction.reply({ content: null, embeds: [embedSuccessTrue], ephemeral: true });
                } else if (targetChannel.nsfw) {
                    await targetChannel.edit({ nsfw: false });
                    await interaction.reply({ content: null, embeds: [embedSuccessFalse], ephemeral: true });
                }
            } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                await interaction.reply({ content: null, embeds: [embedMissingPermissions], ephemeral: true });
            }
        } else if (!currentGuild.available) {
            await interaction.reply({ content: null, embeds: [embedFailure], ephemeral: true })
        }
    }
}