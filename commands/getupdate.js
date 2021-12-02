const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { execute } = require('./message');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function choose(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const getUpdateGIF = ["https://c.tenor.com/2AasysG6vcYAAAAd/sparkly-eye-anime.gif", "https://c.tenor.com/IrKex2lXvR8AAAAC/sparkly-eyes-joy.gif", "https://c.tenor.com/n7c5jw31piEAAAAC/watashi-nouryoku-mile.gif"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getupdate')
        .setDescription('Fetches the latest update data/news.'),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const developer = interaction.client.users.cache.get('779799406412693545');
        const supportServer = interaction.client.guilds.cache.get('737302217198927952');
        const GIF = choose(getUpdateGIF);

        //Embed
        const updateEmbed = new MessageEmbed()
            .setTitle('Update v2021.12.02.2')
            .setDescription(`What's new in version \`2021.12.02.2\`:\n\n+ Fixes\n\nMigration - New account/software\n\nOld updates:\n- Alpha commands:\n- permissions (broken)\n\nTested commands (working):\n- edit_role_name (new)\n- create_role (new)\n- delete_role (new)\n- create_channel (new)\n- delete_channel (new)\n- kiss (new)\n- slap (new)\n- no_bully (new/exclusive)\n- hug (new)\n- score (new)\n\n**Updated commands:**\n- kick\n- ban\n- pardon\n- apply_role (new/fixed)\n- msg (exclusive/new)\n- request (exclusive/new)\n - loli (exclusive/new)\n - attack (new/migrated)`)
            .setColor('#c21313')
            .setAuthor(`${developer.tag}`, `${developer.avatarURL({ format: "png", size: 512 })}`)
            .setThumbnail(`${developer.avatarURL({ format: "png", size: 1024 })}`)
            .setImage(GIF)

        if (currentUser.id !== developer.id) {
            await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
        } else if (currentUser.id === developer.id && currentGuild.id === supportServer.id) {
            await interaction.channel.send({ content: null, embeds: [updateEmbed], ephemeral: false });
        } else if (currentUser.id === developer.id && currentGuild.id !== supportServer.id) {
            await interaction.reply({ content: null, embeds: [updateEmbed], ephemeral: true });
        }
    }
}