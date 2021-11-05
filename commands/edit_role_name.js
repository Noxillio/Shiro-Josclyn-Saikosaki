const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, InteractionCollector } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit_role_name')
        .setDescription('Edits the target role name.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The target role.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('New name for the target role.')
                .setRequired(true) 
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const targetRole = interaction.options.getRole('role');
        const newRoleName = interaction.options.getString('name');

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
            .setDescription(`Role name has been updated to: **${newRoleName}**`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))


            if (currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                try {
                    await currentGuild.roles.edit(targetRole, { name: newRoleName });
                    await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: true });
                } catch (error) {
                    const embedError = new MessageEmbed()
                        .setTitle(':x: | Failure!')
                        .setDescription(`To be advised: An error has occured:\n- ${error}`)
                        .setColor('#ff0000')
                        .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

                    await interaction.reply({ content: null, embeds: [embedError], ephemeral: true });
                }
            } else if (!currentMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                await interaction.reply({ content: null, embeds: [embedMissingPermission], ephemeral: true });
            }
    }
}