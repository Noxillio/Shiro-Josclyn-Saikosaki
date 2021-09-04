const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('A simple test command (does nothing).')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Target user.')
		),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		await interaction.reply(`\`True\` | ${targetUser}`);
	},
};