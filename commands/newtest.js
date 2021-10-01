const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newtest')
        .setDescription('A new test.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your message.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentUser = interaction.user;
        const currentMember = interaction.member;
        const userString = interaction.options.getString('message');

        // Embeds
        const userMessageEmbed = new MessageEmbed()
            .setTitle('Hey, look here!')
            .setDescription(`You wrote/typed: ${userString}`)
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        await interaction.reply({ content: `This stays between us...unless you choose to screenshot and share. Hey, that is not nice, ${currentUser}!`, embeds: [userMessageEmbed], ephemeral: true });
    }
}