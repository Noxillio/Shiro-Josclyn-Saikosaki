const { Client, Intents, Collection, MessageEmbed, Permissions, MessageActionRow, MessageButton, MessageSelectMenu, CommandInteractionOptionResolver, Guild} = require('discord.js');
const availableIntents = new Intents();
availableIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: availableIntents });
const {prefix, token} = require('./config.json');
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Now logged in as ${client.user.tag}.`)
});

 const bot_developer = null;

const command = client.application?.commands.fetch('681898763249254463');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    // const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token)