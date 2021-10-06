const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply_role')
        .setDescription('Apply role to a specified member.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)    
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The target role.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const targetUser = interaction.options.getUser('user');
        const targetRole = interaction.options.getRole('role');

        // Embeds
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedMissingPermission = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: You (${currentMember}) are missing the following permission(s):\n- [\`MANAGE_ROLES\`]`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Success!')
            .setDescription(`Applied ${targetRole} to ${targetUser}!`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            try {
                // Add target role to member ??
                await interaction.guild.members.add(targetUser, { roles: [targetRole] });
            } catch (error) {
                const embedError = new MessageEmbed() // Forgetful
                    .setTitle(':x: | You failed, Suzuko!')
                    .setDescription(`You dumb, the error is right here!\n- ${error}`)
                    .setColor('#ff0000')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedError], ephemeral: true });
            }
        } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            await interaction.reply({ content: null, embeds: [embedMissingPermission], ephemeral: true });
        }
    }
}