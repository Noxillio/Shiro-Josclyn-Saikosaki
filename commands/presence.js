const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const availablePresences = ["online", "idle", "dnd"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('presence')
        .setDescription('Updates the bot\'s status.')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('Set the client\'s status.')
                .setRequired(true)
                .addChoice('Online', 'idle')
                .addChoice('Idle', 'idle')
                .addChoice('Do Not Disturb', 'dnd')
        )
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Set the client\'s action.')
                .setRequired(true)
                .addChoice('Playing', 'PLAYING')
                .addChoice('Watching', 'WATCHING')
                .addChoice('Listening', 'LISTENING')
                .addChoice('Streaming', 'STREAMING')
        )
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to display as the action of the set status.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const author = interaction.user;
        const selectedStatus = interaction.options.getString('status');
        const setAction = interaction.options.getString('action');
        const setText = interaction.options.getString('text');
        const presenceUpdate = interaction.client.user;

        if (author.id === "635673822934204417" || author.id === "779799406412693545") {
            try {
                await presenceUpdate.setStatus(selectedStatus);
                await presenceUpdate.setActivity(setText, { type: setAction });
                await sleep(2000)
                await interaction.reply({ content: `Bot status has been updated accordingly.\nSTATUS: \`${selectedStatus}\`\nACTION: \`${setAction}\`\nTEXT: \`${setText}\``, ephemeral: true });
            } catch (error) {
                await interaction.reply({ content: `Error - ${error}`, ephemeral: true });
            }
        } else if (!author.id === "635673822934204417" || !author.id === "779799406412693545") {
            await interaction.reply({ content: `You (${author}) are not allowed to execute this account.`, ephemeral: true });
        }
    }
}