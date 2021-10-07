const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const kissGIF = ["https://media1.tenor.com/images/9fac3eab2f619789b88fdf9aa5ca7b8f/tenor.gif", "https://media1.tenor.com/images/02d9cae34993e48ab5bb27763d5ca2fa/tenor.gif", "https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif", "https://media1.tenor.com/images/37633f0b8d39daf70a50f69293e303fc/tenor.gif", "https://media1.tenor.com/images/5cf6c2fef93911111538d837ec71c24c/tenor.gif", "https://media1.tenor.com/images/f1dd2c4bade57949f49daeedbe3a4b86/tenor.gif", "https://media1.tenor.com/images/230e9fd40cd15e3f27fc891bac04248e/tenor.gif", "https://media1.tenor.com/images/105a7ad7edbe74e5ca834348025cc650/tenor.gif", "https://media1.tenor.com/images/bc5e143ab33084961904240f431ca0b1/tenor.gif", "https://media1.tenor.com/images/241fedb84f5ecb76477a02ab0b365d25/tenor.gif", "https://media1.tenor.com/images/6bd9c3ba3c06556935a452f0a3679ccf/tenor.gif"];

function choose(choices) {
    index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Kiss somebody (virtually).')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason.')
                .setRequired(false)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const GIF = choose(kissGIF);

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedKiss = new MessageEmbed()
            .setDescription(`${currentMember} kissed ${targetUser}.\nReason: ${reason}`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage(GIF)

        if (currentUser.id === targetUser.id) {
            await interaction.reply({ content: `Self-love, that is nice and all, but not what this command is going for.`, ephemeral: true });
        } else if (currentUser.id !== targetUser.id) {
            if (targetUser.id === shiroSaikosaki.id && currentUser.id !== developer.id) {
                await interaction.reply({ content: `No.`, ephemeral: true });
            } else if (targetUser.id !== shiroSaikosaki.id || currentUser.id === developer.id) {
                await interaction.reply({ content: null, embeds: [embedKiss] });
            }
        }
    }
}