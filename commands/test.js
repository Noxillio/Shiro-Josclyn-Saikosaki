const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('A simple test command (does nothing).'),
	async execute(interaction) {
		await interaction.reply(`\`True\``);
	},
};