const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete_channel')
        .setDescription('Deletes a specified Discord channel.')
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

        const embedFailureUnknown = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`The command failed.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Channel (${targetChannel.name}) has been deleted from the server!`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedMissingPermission = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: You (${currentMember}) are missing the following permission(s):\n- \`MANAGE_CHANNELS\``)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            try {
                await targetChannel.delete();
                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
            } catch (error) {
                const embedFailureError = new MessageEmbed()
                    .setTitle(':x: | Failure!')
                    .setDescription(`The command failed due to the following error(s):\n- \`${error}\``)
                    .setColor('#ff0000')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
                await interaction.reply({ content: null, embeds: [embedFailureError], ephemeral: true });
            }
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermission], ephemeral: true });
        }
    }
}