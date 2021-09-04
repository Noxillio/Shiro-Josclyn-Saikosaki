const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Retrieves an embed with helpful information/buttons (SJS).'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
                .setTitle('Help Section')
                .setDescription('This embeds contains all of the helpful buttons and links so far, this is a migration project so unfortunately, not ALL commands will be ported over due to lack of JavaScript knowledge, however, in due time, those commands will be reimplemented.')
                .setColor('#c21313')
                // .setAuthor(interaction.author.name, interaction.author.avatarURL)
        const helpRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Commands')
                    .setURL('https://stdayldhwurfpidrnmtzla-on.drv.tw/www.suzukoinakajima.com/discord/bot/681898763249254463/home.html#botcommands')
                    .setStyle('LINK')
            );

        await interaction.reply({ content: ":spades: | Helpful buttons for the future.", embeds: [helpEmbed], components: [helpRow]});
    }
}