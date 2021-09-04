const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ssi')
        .setDescription('Sends the support server invite.'),
    async execute(interaction) {
        const supportServer = interaction.guild.fetch('737302217198927952')
        const serverInvite = supportServer.invites.create({ maxAge: 300, maxUses: 1, unique: true });

        await interaction.reply({ content: `${serverInvite}`, ephemeral: true });
    }
}