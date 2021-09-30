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
            .setTitle('Update v2021.9.30.10')
            .setDescription(`What's new in version \`2021.9.30.10\`:\n- New commands (migrated)!\n\n- report\n- edit_channel_name\n- nsfw\n\nMore commands are still in the works, these commands have been tested and work as programmed.\n\nCommand (ticket) is broken.`)
            .setColor('#c21313')
            .setAuthor(`${botOwner.tag}`, `${botOwner.avatarURL({ format: "png", size: 512 })}`)
            .setThumbnail(`${botOwner.avatarURL({ format: "png", size: 1024 })}`)
        await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
    }
}