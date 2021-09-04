const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks the bot\'s latency (SJS).'),
	async execute(interaction) {
		await interaction.reply(`:star: | Not ready, ${interaction.user}!`);
	},
};