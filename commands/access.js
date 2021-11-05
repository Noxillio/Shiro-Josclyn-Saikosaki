const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, Permissions, Collection } = require('discord.js');

const integrationGuilds = ["816880996740759562", "861617696348831784"];
// ["Saikosaki, Shiro | Discord Bot Support", "Saikosaki, Shiro - Advanced!"]
const correctCode = "Discord";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('access')
        .setDescription('[Exclusive]')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Hint: Current platform.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const code = interaction.options.getString('code');

        // Embeds
        const embedCheckFailure = new MessageEmbed()
            .setTitle(':x: | Check - Failure!')
            .setDescription(`To be advised: This Discord (**${currentGuild.name}**) is **NOT** integration-based!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage('https://i.ibb.co/mJmKThP/system-failure-system-down.gif')

        const embedCheckSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Check - Success!')
            .setDescription(`:gear: | Modification have been applied to your Discord account in this server (**${currentGuild.name}**).`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedInvalidCode = new MessageEmbed()
            .setTitle(':x: | Code - Failure!')
            .setDescription(`To be advised: The code (\`${code}\`) you input is invalid!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentGuild.available) {
            if (code === correctCode) {
                for (const guilds of integrationGuilds) {
                    if (currentGuild.id === guilds) {
                        if (currentGuild.id === '816880996740759562') {
                            const roleAdministrator = integrationGuild.roles.cache.find(role => role.name === 'Administrator');
                            await currentMember.roles.add([`${roleAdministrator.id}`]);
                            await interaction.reply({ content: null, embeds: [embedCheckSuccess], ephemeral: true });
                        } else if (currentGuild.id === '') {
                            const roleAuthority = integrationGuild.roles.cache.find(role => role.name === 'Administrator');
                            await currentMember.roles.add([`${roleAuthority.id}`]);
                            await interaction.reply({ content: null, embeds: [embedCheckSuccess], ephemeral: true });
                        }
                    } else if (currentGuild.id !== guilds) {
                        await interaction.reply({ content: null, embeds: [embedCheckFailure], ephemeral: true });
                    } break;
                }
            } else if (code !== correctCode) {
                await interaction.reply({ content: null, embeds: [embedInvalidCode], ephemeral: true });
            }
        } else if (!currentGuild.available) {
            await interaction.reply({ content: `An error has occurred with the availability of the current server (**${currentGuild.name}**).`, ephemeral: true });
        }
    }
}