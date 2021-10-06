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
            .setTitle('Update v2021.10.6.21')
            .setDescription(`What's new in version \`2021.10.6.21\`:\n- Alpha commands:\n- permissions (broken)\n- apply_role (broken).\n\nTested commands (working):\n- edit_role_name (new)\n- create_role (new)\n- delete_role (new)\n- create_channel (new)\n- delete_channel (new)`)
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