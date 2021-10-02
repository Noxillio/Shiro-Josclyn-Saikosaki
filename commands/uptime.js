const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Checks how long the bot has been online.'),
    async execute(interaction) {
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const shiroSaikosaki = interaction.client.user;

        // Embeds
        const resultEmbed = new MessageEmbed()
            .setTitle(':stopwatch: | Uptime')
            .setDescription(`Bot uptime (time elapsed) has been: \`${Math.round(interaction.client.uptime / 1000)}s\``)
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)

        await interaction.reply({ content: null, embeds: [resultEmbed], ephemeral: true });
    }
}