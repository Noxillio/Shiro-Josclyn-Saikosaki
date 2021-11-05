const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, PermissionOverwrites } = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Discuss feedback, suggestions, or concerns with the developer in a private channel.'),
    async execute(interaction) {
        const user = interaction.user;
        const author = interaction.member;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const currentGuild = interaction.guild;
        const targetGuild = interaction.client.guilds.cache.get('861617696348831784');
        if (user.id !== developer.id) {
            if (targetGuild.available) {
                const serverInvite = targetGuild.invites.create('861628848214376468', { maxAge: 300, maxUses: 1, temporary: true, unique: true }).then(invite => {let i = interaction.reply({ content: `https://discord.com/invite/${invite.code}`, ephemeral: true })});
                try {
                    const newChannel = await targetGuild.channels.create(`${author.user.id}`, { reason: `Request send by ${author.user.tag}.` });
                    await sleep(3000);
                    const secondServerInvite = targetGuild.invites.create(newChannel.id, { maxAge: 300, maxUses: 1, temporary: true, unique: true }).then(developerInvite => {developer.send(`To be advised:\n${author} is requesting your presence!\nInvite: https://discord.com/invite/${developerInvite.code}`)});
                } catch (error) {
                    await developer.send(`Error - ${error}`);
                }
            } else if (!targetGuild.available) {
                await interaction.reply({ content: `My apologies, I could not locate the target server. Unfortunately, there are some technical issues.\nTry again another time.` });
            }
        } else if (user.id === developer.id && currentGuild.id !== targetGuild.id) {
            interaction.reply({ content: `:x: | Error: You (${developer}) cannot create a ticket for yourself.`, ephemeral: true })
        } else if (user.id === developer.id && currentGuild.id === targetGuild.id) {
            null
        }
    }
}