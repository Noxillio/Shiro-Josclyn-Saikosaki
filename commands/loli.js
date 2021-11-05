const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');

function choose(choices) {
    const index = Math.floor(Math.random() * choices.length)
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loli')
        .setDescription('Random image of loli (anime).')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('If true, this will hide the outcome.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const isEphemeral = interaction.options.getBoolean('ephemeral');

        loliFile = [
            "https://c.tenor.com/p28XuV3FnjIAAAAC/anime-loli.gif",
            "https://c.tenor.com/KSIcVh0UpbIAAAAC/anime-drink.gif",
            "https://c.tenor.com/zRqYp79zteMAAAAC/anime-girl-in-sleepwear.gif",
            "https://c.tenor.com/11XjE6Qh0YYAAAAd/copy-cat-vibe.gif",
            "https://c.tenor.com/28MhlA4rXBQAAAAd/wataten-yuchan.gif",
            "https://c.tenor.com/wS_4Y8Vssj4AAAAC/eat-crab.gif",
            "https://c.tenor.com/kxefu8OQcD8AAAAC/loli-anime.gif",
            "https://c.tenor.com/44xH4hlbDGYAAAAC/loli-cutedemon.gif",
            "https://c.tenor.com/0thkn1rMCZEAAAAC/anime-loli.gif",
            "https://c.tenor.com/T4xbCJSQkt0AAAAC/lolicon-anime.gif",
            "https://c.tenor.com/2VtBUguHvQAAAAAC/renge-anime.gif",
            "https://c.tenor.com/B-0yqZhzZMkAAAAd/dance-loli.gif",
            "https://c.tenor.com/hAH-ByoR0HUAAAAC/anime-chino-kafu.gif",
            "https://c.tenor.com/i_sduhIDq9gAAAAC/loli-shomin.gif",
            "https://c.tenor.com/PK6tRNvvkKAAAAAd/dance-loli.gif",
            "https://c.tenor.com/BPVKHQjVaU8AAAAC/kanna-kamui-platelet.gif",
            "https://c.tenor.com/NLmOnd17K2gAAAAC/remilia-touhou.gif",
            "https://c.tenor.com/hTuhgX570IgAAAAC/noela-cute-smile.gif",
            "https://c.tenor.com/HMJHDk8O_pkAAAAC/noela-running.gif",
            "https://tenor.com/view/anime-loli-eating-cute-gif-18345517"
        ]

        const randomGIF = choose(loliFile);

        const embedSuccess = new MessageEmbed()
            .setTitle(`Loli | ${currentUser.tag}`)
            .setColor('#c21313')
            .setImage(randomGIF)

        const embedNotApplicable = new MessageEmbed()
            .setTitle(`:x: - Error | ${currentUser.tag}`)
            .setDescription(`Your account (${currentUser}) is not registered for this command!`)
            .setColor('#ff0000')

        const applicable = ["395744945622745088"];

        for (const userId of applicable) {
            if (currentUser.id === userId) {
                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: isEphemeral });
            } else if (currentUser.id !== userId) {
                await interaction.reply({ content: null, embeds: [embedNotApplicable], ephemeral: true });
            }
        }
    }
}