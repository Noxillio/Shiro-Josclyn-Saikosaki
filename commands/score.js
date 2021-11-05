const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription('Random score.')
        .addStringOption(option =>
            option.setName('bet')
                .setDescription('Bet a higher score than Shiro Saikosaki\'s!')
                .setRequired(true)
                .addChoice('Bet!', 'true')
                .addChoice('No, thank you.', 'false')  
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Keep output private?')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const betOption = interaction.options.getString('bet');
        const isEphemeral = interaction.options.getBoolean('ephemeral');
        const developer = interaction.client.users.cache.get('635673822934204417');

        // User score
        const userScoreResult = Math.floor(Math.random() * 100);

        // Embed(s)
        const embedResult = new MessageEmbed()
            .setTitle('Results!')
            .setDescription(`You (${currentUser}) received a score of \`${userScoreResult}%\`.`)
            .setColor('#c21313')
            .setAuthor(currentUser.tag, currentUser.avatarURL({ format: "png", size: 512 }))

        if (betOption === 'true') {
            const shiroScoreResult = Math.floor(Math.random() * 100);

            if (userScoreResult > shiroScoreResult) {
                const embedResultUserWins = new MessageEmbed()
                    .setTitle('Results!')
                    .setDescription(`You (${currentUser}) received a score of \`${userScoreResult}%\`.\n${shiroSaikosaki} received a score of \`${shiroScoreResult}%\`.\n\nCongratulations, you (${currentUser}) won by chance!`)
                    .setColor('#c21313')
                    .setAuthor(currentUser.tag, currentUser.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedResultUserWins], ephemeral: isEphemeral });
            } else if (userScoreResult < shiroScoreResult) {
                const embedResultUserLose = new MessageEmbed()
                    .setTitle('Results!')
                    .setDescription(`You (${currentUser}) received a score of \`${userScoreResult}%\`.\n${shiroSaikosaki} received a score of \`${shiroScoreResult}%\`\n\nYou (${currentUser}) lost this round!`)
                    .setColor('#c21313')
                    .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedResultUserLose], ephemeral: isEphemeral });
            } else if (userScoreResult === shiroScoreResult) {
                const embedResultDraw = new MessageEmbed()
                    .setTitle('Results!')
                    .setDescription(`You (${currentUser}) received a score of \`${userScoreResult}%\`.\n${shiroSaikosaki} received a score of \`${shiroScoreResult}%\`\n\nIt's a draw!`)
                    .setColor('#716fff')
                    .setAuthor(developer.tag, developer.avatarURL({ format: "png", size: 512 }))

                await interaction.reply({ content: null, embeds: [embedResultDraw], ephemeral: isEphemeral });
            }
        } else if (betOption === 'false') {
            await interaction.reply({ content: null, embeds: [embedResult], ephemeral: isEphemeral });
        }
    }
}