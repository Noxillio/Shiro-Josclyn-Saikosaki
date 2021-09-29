const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { execute } = require('./message');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getupdate')
        .setDescription('Fetches the latest update data/news.'),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const botOwner = interaction.client.users.cache.get('635673822934204417');

        //Embed
        const updateEmbed = new MessageEmbed()
            .setTitle('Update v2021.9.28.1')
            .setDescription(`What's new in version \`2021.9.28.1\`:\n- Transferred all current migration commands to the main project.\n- Slash command support.\n- Migrated over from Python to Node JS (JavaScript).\n\n**The Bad News**\n- Only a small percentage of the commands are available in the new setup.\n- Returned to the ALPHA stage (some commands are expected to break the entire bot).`)
            .setColor('#c21313')
            .setAuthor(`${botOwner.tag}`, `${botOwner.avatarURL({ format: "png", size: 256 })}`)
            .setThumbnail(`${botOwner.avatarURL({ format: "png", size: 1024 })}`)
        await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
    }
}