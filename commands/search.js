const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');

var acquired = null;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Loop through an array (test).')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('User ID')
                .setRequired(true)    
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('If true, this will hide the outcome.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const id = interaction.options.getString('id');
        const targetUser = interaction.client.users.cache.get(id);
        const isEphemeral = interaction.options.getBoolean('ephemeral');

        const discordUsers = [
            { id: 0, name: 'S. Laneko, Katherine', userId: '779799406412693545' },
            { id: 1, name: 'Summer', userId: '400974771942326272' },
            { id: 2, name: 'Tweedy Naima', userId: '431286587159216129' }
        ];

        let ifUser = discordUsers.find(dUsr => dUsr.userId === id);

        try {
            if (ifUser === discordUsers) {
                console.log(`Found ${targetUser.tag} with Discord ID: ${targetUser.id}`);
                await interaction.reply({ content: `Found **${targetUser.tag}** with Discord ID: \`${targetUser.id}\``, ephemeral: isEphemeral });
            } else if (ifUser !== discordUsers) {
                console.log(`Error: User not found.`);
                await interaction.reply({ content: `Error: User not found.` });
            }
        } catch (error) {
            console.log(error);
        } finally {
            console.log(`${ifUser}\n\nDiscord: ${targetUser.tag} (${targetUser.id})`);
        }
    }
}