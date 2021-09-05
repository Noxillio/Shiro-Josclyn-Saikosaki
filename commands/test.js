const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('A simple test command (does nothing).')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Target user.')
		),
	async execute(interaction) {
		const targetUser = interaction.options.getMember('user');
		const author = interaction.member;
		if (author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			await interaction.reply({ content: `You have \`ADMINISTRATOR\` permissions.\nYour chosen target: | ${targetUser}`, ephemeral: true });
		}
		else if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			await interaction.reply({ content: `You do __NOT__ have \`ADMINISTRATOR\` permissions.\nYour chosen target: ${targetUser}`, ephemeral: true });
		}
	},
};