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


        const users = ["202127007100829697", "635673822934204417", "400974771942326272"];

        users.forEach((users) => {
            try {
                if (targetUser.id === users) {
                    acquired = true;
                    console.log(`Found ${targetUser.tag} with Discord ID: ${targetUser.id}\nValid: ${acquired}`);
                } else if (targetUser.id !== users) {
                    acquired = false;
                    console.log(`Error: User not found.\nValid: ${acquired}`);
                }
            } catch (error) {
                console.log(`An error has occurred, review it down below:\n\n${error}`);
            }
        });

        if (acquired === true) {
            await interaction.reply({ content: `Found **${targetUser.tag}** with Discord ID: \`${targetUser.id}\``, ephemeral: isEphemeral });
        } else if (acquired === false) {
            await interaction.reply({ content: `Error: User not found.` });
        }
    }
}