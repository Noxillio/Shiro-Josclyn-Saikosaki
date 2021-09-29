const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const developers = ["635673822934204417"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies any association with the project.'),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentMember = interaction.member;

        // Embed - Success
        const embedSuccess = new MessageEmbed()
            .setTitle(':white_check_mark: | Verification - Successful!')
            .setDescription(`You (${currentUser}) are the developer/maintainer of this Discord project!`)
            .setColor('#008000')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 256 })}`)

        // Embed - Failure
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Verification - Failure!')
            .setDescription(`You (${currentUser}) are in no way associated with this project!`)
            .setColor('#ff0000')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 256 })}`)

        // Find role
        for (const userId of developers) {
            console.log(`${userId} || ${currentUser.id}`);
            if (userId === currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedSuccess] });
            } else {
                await interaction.reply({ content: null, embeds: [embedFailure] });
            } break
        }
    }
}