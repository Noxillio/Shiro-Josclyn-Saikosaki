const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const blacklisted_guilds = ["385378814584422413", "737302217198927952"];
// Black-listed (nsfw || testing): ["OtakuStream x Shiro", "Saikosaki, Shiro | Discord Bot Support"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check_blacklist')
        .setDescription('Checks if the current server is black-listed.')
        .addStringOption(option =>
            option.setName('server_id')
                .setDescription('Leave blank to check the current server.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const guildId = interaction.options.getString('server_id');
        const targetGuild = interaction.client.guilds.cache.get(guildId);

        // Embeds
        const embedTargetServerNotSupported = new MessageEmbed()
            .setTitle(':warning: | Check - Black-listed!')
            .setDescription(`To be advised: The selected Discord (**${targetGuild.name}**) is blacklisted from using nsfw commands. This Discord server is **SFW** (Safe For Work), you will need to transfer to a different Discord that is not black-listed.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedTargetServerSupported = new MessageEmbed()
            .setTitle(':warning: | Check - Black-listed!')
            .setDescription(`To be advised: The Discord (**${targetGuild.name}**) is __NOT__ black-listed from using nsfw commands. You can use nsfw commands in nsfw channels in this server if any are available.`)
            .setColor('#00ff00')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        for (const guild of blacklisted_guilds) {
            if (targetGuild.id === guild) {
                await interaction.reply({ content: null, embeds: [embedTargetServerNotSupported], ephemeral: true });
            } else if (targetGuild.id !== guild) {
                await interaction.reply({ content: null, embeds: [embedTargetServerSupported], ephemeral: true });
            } break;
        }
    }
}