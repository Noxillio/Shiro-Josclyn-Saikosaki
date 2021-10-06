const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete_role')
        .setDescription('Delete a specified role.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The target role.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for deleting the role.')
                .setRequired(false)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const targetRole = interaction.options.getRole('role');
        const reason = interaction.options.getString('reason');

        // Embeds
        const embedFailureUnknown = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`The command failed.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedMissingPermission = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: You (${currentMember}) are missing the following permission(s):\n[:x:] - \`MANAGE_ROLES\``)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Role (**${targetRole.name}**) has been deleted from the server!\nReason:\n- ${reason}`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            try {
                await targetRole.delete()
                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
            } catch (error) {
                const embedFailureError = new MessageEmbed()
                    .setTitle(':x: | Failure!')
                    .setDescription(`The command failed due to the following error:\n- \`${error}\``)
                    .setColor('#ff0000')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedFailureError], ephemeral: true });
            }
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermission], ephemeral: true });
        }
    }
}