const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { execute } = require('./kick');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch_image')
        .setDescription('Paste selected image url as \'png\' image on an embed.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The image url.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const currentGuild = interaction.guild;
        const imageURL = interaction.options.getString('url');

        const imageEmbed = new MessageEmbed()
            .setTitle('Image')
            .setColor('#c21313')
            .setImage(imageURL, { format: "png", size: 1024 })
        await interaction.reply({ content: null, embeds: [imageEmbed], ephemeral: true });
    }
}