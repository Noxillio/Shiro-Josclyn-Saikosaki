const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('msg')
        .setDescription('Send messages as the bot.')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Data.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const msgContent = interaction.options.getString('content');

        try {
            await interaction.channel.send({ content: msgContent });
            await interaction.reply({ content: `:white_check_mark: | Success!`, ephemeral: true });
        } catch (error) {
            await interaction.reply({ content: `Error - \`${error}\`` });
        } finally {
            await interaction.reply({ content: `Break!`, embeds: null });
        }
    }
}