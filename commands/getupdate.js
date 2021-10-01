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
        const developer = interaction.client.users.cache.get('635673822934204417');
        const supportServer = interaction.client.guilds.cache.get('737302217198927952');

        //Embed
        const updateEmbed = new MessageEmbed()
            .setTitle('Update v2021.9.30.10')
            .setDescription(`What's new in version \`2021.9.30.10\`:\n- New commands (migrated)!\n\n- report\n- edit_channel_name\n- nsfw\n\nMore commands are still in the works, these commands have been tested and work as programmed.\n\nCommand (ticket) is broken.`)
            .setColor('#c21313')
            .setAuthor(`${developer.tag}`, `${developer.avatarURL({ format: "png", size: 512 })}`)
            .setThumbnail(`${developer.avatarURL({ format: "png", size: 1024 })}`)

        if (currentUser.id !== developer.id) {
            await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
        } else if (currentUser.id === developer.id && currentGuild.id === supportServer.id) {
            await interaction.channel.send({ content: null, embeds: [updateEmbed], ephemeral: false });
        } else if (currentUser.id === developer.id && currentGuild.id !== supportServer.id) {
            await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
        }
    }
}