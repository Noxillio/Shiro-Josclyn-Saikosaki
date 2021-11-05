const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { execute } = require('./ssi');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinvite')
        .setDescription('Fetches an invite for the current server.'),
    async execute(interaction) {
        const guildInvite = interaction.guild.invites.create([{ maxAge: 300, maxUses: 1, unique: true }]);
        await interaction.reply({ content: `${guildInvite}`, empheral: true });
    }
}