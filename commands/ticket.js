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
        const author = interaction.member;
        const owner = interaction.client.users.cache.get('635673822934204417');
        const currentGuild = interaction.guild;
        const targetGuild = interaction.client.guilds.cache.get('861617696348831784');

        if (targetGuild.available) {
            const serverInvite = targetGuild.invites.create('861628848214376468', { maxAge: 300, maxUses: 1, temporary: true, unique: true }).then(invite => {let i = interaction.reply({ content: `https://discord.com/invite/${invite.code}`, ephemeral: true })});
            try {
                const newChannel = await targetGuild.channels.create(`${author.user.id}`, { reason: `Request send by ${author.user.tag}.` });
                await sleep(3000);
                const secondServerInvite = targetGuild.invites.create(newChannel.id, { maxAge: 300, maxUses: 1, temporary: true, unique: true }).then(ownerInvite => {owner.send(`To be advised:\n${author} is requesting your presence!\nInvite: https://discord.com/invite/${ownerInvite.code}`)});
                await sleep(10000);
                await owner.send('This message has been set seven (10) seconds since...');
            } catch (error) {
                await owner.send(`Error - ${error}`);
            }
        } else if (!targetGuild.available) {
            await interaction.reply({ content: `My apologies, I could not locate the target server. Unfortunately, there are some technical issues.\nTry again another time.` });
        }
    }
}