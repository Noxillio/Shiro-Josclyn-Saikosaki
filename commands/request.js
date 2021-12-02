const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, Permissions, Collection } = require('discord.js');

const integrationGuilds = ["816880996740759562", "861617696348831784"];
// ["Saikosaki, Shiro | Discord Bot Support", "Saikosaki, Shiro - Advanced!"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Request administrator permissions. | [Exclusive]')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of request.')
                .setRequired(true)
                .addChoice('Developer Data', 'DEVELOPER_DATA')
                .addChoice('Integration', 'INTEGRATION')    
        )
        .addStringOption(option =>
            option.setName('guild')
                .setDescription('Required either way.')
                .setRequired(true)
                .addChoice('Discord: Integration', '816880996740759562')
                .addChoice('Saikosaki, Shiro - Advanced!', '861617696348831784')
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const developer = interaction.client.users.cache.get('779799406412693545');
        const requestType = interaction.options.getString('type');
        const optionGuild = interaction.options.getString('guild');
        const integrationGuild = interaction.client.guilds.cache.get(optionGuild);

        // Embeds
        const embedCheckFailure = new MessageEmbed()
            .setTitle(':x: | Check - Failure!')
            .setDescription(`To be advised: You are not found in this Discord (**${integrationGuild.name}**)!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage('https://i.ibb.co/mJmKThP/system-failure-system-down.gif')

        const embedCheckSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Check - Success!')
            .setDescription(`:gear: | Modification have been applied to your Discord account in this server (**${integrationGuild.name}**).`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedGuildNotAvailable = new MessageEmbed()
            .setTitle(':x: | Guild - Failure!')
            .setDescription(`To be advised: An error has occurred with the Discord\'s (**${currentGuild.name}**) availability!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedRestricted = new MessageEmbed()
            .setTitle(':x: | User - Failure!')
            .setDescription(`To be advised: Your \`Discord ID\` does not match the following: ***${developer.username}***`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedDeveloperCannotViewOwnData = new MessageEmbed()
            .setTitle(':x: | User - Failure!')
            .setDescription(`To be advised: You cannot view your own data, dummy!`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedDeveloperData = new MessageEmbed()
            .setTitle('Developer Data')
            .setDescription(`**Username:** *${developer.username}*\n**Discriminator:** \`#${developer.discriminator}\`\n**ID:** \`${developer.id}\`\n**Account creation date:** \`${developer.createdAt}\``)
            .setColor('#0000ff')
            .setThumbnail(developer.avatarURL({ format: "png", size: 512 }))
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentGuild.available) {
            if (requestType === 'INTEGRATION') {
                if (currentUser.id === developer.id) {
                    try {
                        if (optionGuild === '861617696348831784') {
                            const guildSaikosakiAdvanced = interaction.client.guilds.cache.get('861617696348831784');
                            const memberSuzukoSaikoskai = guildSaikosakiAdvanced.members.cache.get(`${developer.id}`);
                            const roleRemnant = integrationGuild.roles.cache.find(role => role.name === 'Remnant');

                            await memberSuzukoSaikoskai.roles.add([`${roleRemnant.id}`]);
        
                            await interaction.reply({ content: null, embeds: [embedCheckSuccess], ephemeral: true });
                        } else if (optionGuild === '816880996740759562') {
                            const guildDiscordIntegration = interaction.client.guilds.cache.get('816880996740759562');
                            const memberSuzukoIntegration = guildDiscordIntegration.members.cache.get(`${developer.id}`);
                            const roleAdministrator = integrationGuild.roles.cache.find(role => role.name === 'Administrator');
    
                            await memberSuzukoIntegration.roles.add([`${roleAdministrator.id}`]);
        
                            await interaction.reply({ content: null, embeds: [embedCheckSuccess], ephemeral: true });
                        }
                    } catch (error) {
                        await interaction.reply({ content: `Error - \`${error}\``, ephemeral: true });
                    }
                } else if (currentUser.id !== developer.id) {
                    await interaction.reply({ content: null, embeds: [embedRestricted], ephemeral: true });
                }
            } else if (requestType === 'DEVELOPER_DATA') {
                if (currentUser.id === developer.id) {
                    await interaction.reply({ content: null, embeds: [embedDeveloperCannotViewOwnData], ephemeral: true });
                } else if (currentUser.id !== developer.id) {
                    await interaction.reply({ content: null, embeds: [embedDeveloperData], ephemeral: true });
                }
            } else {
                await interaction.reply({ content: `Error: Unknown`, ephemeral: true })
            }
        } else if (!currentGuild.available) {
            await interaction.reply({ content: null, embeds: [embedGuildNotAvailable], ephemeral: true });
        }
    }
}