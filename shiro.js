const { Client, Intents, Collection, MessageEmbed, Permissions, MessageActionRow, MessageButton, MessageSelectMenu, CommandInteractionOptionResolver, Guild} = require('discord.js');
const availableIntents = new Intents();
availableIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
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

bot_developer = null;

const command = client.application?.commands.fetch('822311111570489435');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    // const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async i => {
        if (i.customId === 'banCancel') {
            const banRowCanceled = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('banCancelled')
                        .setLabel('Cancel')
                        .setStyle('SUCCESS')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('banDisabled')
                        .setLabel('Ban')
                        .setStyle('DANGER')
                        .setDisabled(true)
                )
            await i.update({ content: 'You have canceled this action (ban)!', components: [banRowCanceled] });
        }
        else if (i.customId === 'banConfirm') {
            const banRowConfirmed = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('banCancelDisabled')
                        .setLabel('Cancel')
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('banConfirmed')
                        .setLabel('Ban')
                        .setStyle('DANGER')
                        .setDisabled(true)
                )
            try {
                var banread = require('./commands/ban');
                global.banTarget
                global.banReason
                await interaction.guild.members.ban(banTarget, [banReason] );
            } catch (error) {
                return interaction.reply(`Failed to ban **${banTarget}**!\nError: ${error}`)
            }
            await i.update({ content: 'You have confirmed this action (ban)!', components: [banRowConfirmed], ephemeral: true });
        }
    });

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