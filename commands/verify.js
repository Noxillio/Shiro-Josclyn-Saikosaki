const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const developers = ["635673822934204417"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies any association with the project.'),
    async execute(interaction) {
        const author = interaction.member;

        // Embed - Success
        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Verification - Successful!')
            .setDescription(`You (${author}) are the developer of this very project!`)
            .setColor('#008000')

        // Embed - Failure
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Verification - Failure!')
            .setDescription(`You (${author}) are in no way associated with this project!`)
            .setColor('#ff0000')

        // Find role
        for (const userId of developers) {
            console.log(`${userId} || ${author.id}`);
            if (userId === author.id) {
                await interaction.reply({ content: "[]", embeds: [embedSuccess] });
            } else {
                await interaction.reply({ content: "[]", embeds: [embedFailure] });
            } break
        }
    }
}