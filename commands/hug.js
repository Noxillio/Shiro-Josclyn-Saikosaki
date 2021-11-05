const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const hugGIF = ["https://media1.tenor.com/images/1d94b18b89f600cbb420cce85558b493/tenor.gif", "https://media1.tenor.com/images/daffa3b7992a08767168614178cce7d6/tenor.gif", "https://media1.tenor.com/images/7db5f172665f5a64c1a5ebe0fd4cfec8/tenor.gif", "https://media1.tenor.com/images/7e30687977c5db417e8424979c0dfa99/tenor.gif", "https://media1.tenor.com/images/40aed63f5bc795ed7a980d0ad5c387f2/tenor.gif", "https://media1.tenor.com/images/7ca5f791d767630c8317025951eb1a7f/tenor.gif", "https://media1.tenor.com/images/d3dca2dec335e5707e668b2f9813fde5/tenor.gif", "https://media1.tenor.com/images/0a7494520e44fd0c9a78c5acb854a269/tenor.gif", "https://media1.tenor.com/images/8055f0ab4e377e35f5884dfe3e3fec52/tenor.gif", "https://media1.tenor.com/images/4ebdcd44de0042eb416345a50c3f80c7/tenor.gif", "https://media1.tenor.com/images/203df2c2d6288d8c73fd56b1e2da559e/tenor.gif", "https://media1.tenor.com/images/f0c148a89eaa3653667004bce18b678f/tenor.gif", "https://media1.tenor.com/images/bb9c0c56769afa3b58b9efe5c7bcaafb/tenor.gif", "https://media1.tenor.com/images/c1058ebe89313d50dfc878d38630036b/tenor.gif", "https://media1.tenor.com/images/34a1d8c67e7b373de17bbfa5b8d35fc0/tenor.gif", "https://media1.tenor.com/images/bb841fad2c0e549c38d8ae15f4ef1209/tenor.gif", "https://media1.tenor.com/images/df8b87203442db2c2af2a806eb7153d4/tenor.gif", "https://media1.tenor.com/images/b35c2462c7b623d050e28e6f1886a41f/tenor.gif"];

function choose(choices) {
    index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug somebody (virtually).')
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
        const GIF = choose(hugGIF);

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedHug = new MessageEmbed()
            .setDescription(`${currentMember} hugged ${targetUser}.\nReason: ${reason}`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage(GIF)

        if (currentUser.id === targetUser.id) {
            await interaction.reply({ content: `Self-love, that is nice and all, but not what this command is going for.`, ephemeral: true });
        } else if (currentUser.id !== targetUser.id) {
            if (targetUser.id === shiroSaikosaki.id && currentUser.id !== developer.id) {
                await interaction.reply({ content: `No.`, ephemeral: true });
            } else if (targetUser.id !== shiroSaikosaki.id || currentUser.id === developer.id) {
                await interaction.reply({ content: null, embeds: [embedHug] });
            }
        }
    }
}