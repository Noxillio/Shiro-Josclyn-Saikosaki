const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const availableGIF = ["https://c.tenor.com/ZUyLW5r6hjEAAAAC/anime-no.gif", "https://c.tenor.com/_KbWqKsnOxQAAAAC/peashy-yellow-heart.gif", "https://c.tenor.com/JbnMtYtAoE8AAAAC/anime-bully.gif"];

function choose(choices) {
    index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('no_bully')
        .setDescription('[Exclusive]')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Have me tell them not to bully you.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const exclusiveUser = interaction.client.users.cache.get('329805540345774082');
        const targetUser = interaction.options.getUser('user');

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (currentUser.id === exclusiveUser.id) {
            const GIF = choose(availableGIF);

            const embedSuccess = new MessageEmbed()
                .setDescription(`Hey, you there, ${targetUser.tag}! No bully!`)
                .setColor('#c21313')
                .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
                .setImage(GIF)

            await interaction.reply({ content: null, embeds: [embedSuccess] });
        } else if (currentUser.id !== exclusiveUser.id) {
            await interaction.reply({ content: null, embeds: [embedFailure], ephemeral: true });
        }
    }
}