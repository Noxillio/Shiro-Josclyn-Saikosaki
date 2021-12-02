const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const developers = ["779799406412693545"];
const projectHelpers = ["400974771942326272"];

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
            .setColor('#0000ff')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 256 })}`)

        // Embed - Alternative
        const embedAlternative = new MessageEmbed()
            .setTitle(':white_check_mark: | Verification - Successful!')
            .setDescription(`You (${currentUser}) are the developer/maintainer of this Discord project!\n\nAccount type:\n- \`ALTERNATIVE\``)
            .setColor('#fff716')
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 256 })}`)
        
        // Embed - Helper
        const embedHelper = new MessageEmbed()
            .setTitle(':white_check_mark: | Verification - Successful!')
            .setDescription(`You (${currentUser}) are a helper of this Discord project!`)
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
            if (userId === currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedSuccess] });
            } else if (alternativeId === currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedAlternative] });
            } else if (helperId === currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedHelper] });
            } else {
                await interaction.reply({ content: null, embeds: [embedFailure] });
            }
        }
    }
}