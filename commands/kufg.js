const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kufg')
        .setDescription('[Exclusive]')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Integer')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('user_id')
                .setDescription('Integer')
                .setRequired(true)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const guildId = interaction.options.getString('id');
        const userId = interaction.options.getString('user_id');

        // Get user and guild.
        const targetGuild = interaction.client.guilds.cache.get(guildId);
        const targetUser = targetGuild.members.cache.get(userId);

        // Embeds
        const embedAllOfTheAboveFailure = new MessageEmbed()
            .setTitle(':x: | [:x:] Check => [:x:] User => [:x:] Server => Major Failure!')
            .setDescription(`To be advised: Your account is not registered under this command!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedAllOfTheAboveSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | [:white_check_mark:] Check => [:white_check_mark:] User => [:white_check_mark:] Server => Success!')
            .setDescription(`:gear: | Kicked **${targetUser.tag}** (\`${targetUser.id}\`) from **${targetGuild.name}** (\`${targetGuild.id}\`)!`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedTargetNotKickable = new MessageEmbed()
            .setTitle(':x: | [:white_check_mark:] => Check => [:x:] User => [:white_check_mark:] Server => Partial Failure!')
            .setDescription(`To be advised: This user (**${targetUser}** [\`${targetUser.id}\`]) cannot be kicked!\nReason: Is not kickable!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedGuildFailure = new MessageEmbed()
            .setTitle(':warning: | [:white_check_mark:] => Check => [:white_check_mark:] User => [:x:] Server => Partial Failure!')
            .setDescription(`To be advised: Your account is registered under this command, but the server may not be!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentUser.id === developer.id) {
            if (targetUser.kickable) {
                try {
                    await targetGuild.members.kick(targetUser, { reason: `Requested automation.` });
                    await interaction.reply({ content: null, embeds: [embedAllOfTheAboveSuccess], ephemeral: true });
                } catch (error) {
                    console.log(error);
                }
            } else if (!targetUser.kickable) {
                await interaction.reply({ content: null, embeds: [embedTargetNotKickable] });
            }
        } else if (currentUser.id !== developer.id) {
            await interaction.reply({ content: null, embeds: [embedAllOfTheAboveFailure], ephemeral: true });
        }
    }
}