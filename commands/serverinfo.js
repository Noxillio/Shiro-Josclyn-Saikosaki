const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Retrieves the current server information (SJS).'),
	async execute(interaction) {
		if (interaction.guild.available === true) {
            const server_info_embed = new MessageEmbed()
                .setTitle(`${interaction.guild.name}`)
                .setDescription(`Guild ID: \`${interaction.guild.id}\`\nGuild owner: <@${interaction.guild.ownerId}> (\`${interaction.guild.ownerId}\`)\nPartnered server: \`${interaction.guild.partnered}\`\nServer verification level: **${interaction.guild.verificationLevel}**\nServer Member Count: \`${interaction.guild.memberCount}\`\nServer creation date: \`${interaction.guild.createdAt}\`\nDefault notification settings: **${interaction.guild.defaultMessageNotifications}**`)
                .setThumbnail(interaction.guild.iconURL)
                .setColor('#c21313')

            await interaction.reply({ content: "Fetched!", embeds: [server_info_embed], ephemeral: true });
        } else if (interaction.guild.available === false) {
            const errorEmbed = new MessageEmbed()
                .setTitle(':warning: Error! :warning:')
                .setDescription('An error has occurred, the target server is either currently unavailable or an outage has occurred.')
                .setAuthor(interaction.client.tag, interaction.client.avatarURL)
                .setColor('#ff0000')
            await interaction.reply({ content: "Error: ", embeds: [errorEmbed] })
        }
	},
};