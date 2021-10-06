const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_role')
        .setDescription('Create a new role for the current server.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name for new role.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Color of the new role. Example: #ffffff')
                .setRequired(true)    
        )
        .addIntegerOption(option =>
            option.setName('mentionable')
                .setDescription('Mentionable: 0 (false) || 1 (true)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const roleName = interaction.options.getString('name');
        const roleColor = interaction.options.getString('color');
        const mentionable = interaction.options.getInteger('mentionable');

        const embedFailureUnknown = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`The command failed.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedMissingPermissions = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`You (${currentMember}) are missing the following permissions!\n[:x:] - \`MANAGE_ROLES\``)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`You (${currentMember}) created a new role!\n- name: **${roleName}**\n- mentionable: \`${String(mentionable)}\``)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            try {
                await currentGuild.roles.create({ name: roleName, color: roleColor, mentionable: mentionable });
                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
            } catch (error) {
                const embedFailureError = new MessageEmbed()
                    .setTitle(':x: | Failure!')
                    .setDescription(`This command could not perform well due to the following:\n- \`${error}\``)
                    .setColor('#ff0000')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
                await interaction.reply({ content: null, embeds: [embedFailureError], ephemeral: true });
            }
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermissions], ephemeral: true });
        }
    }
}