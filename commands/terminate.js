const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const processedCode = "2020.2.25";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('terminate')
        .setDescription('Terminates the client\'s connection to Discord.')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Hint: Shiro\'s birthday.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentUser = interaction.user;
        const currentMember = interaction.member;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const code = interaction.options.getString('code');

        // Embeds
        const embedOptions = new MessageEmbed()
            .setTitle('Proceed?')
            .setDescription('Are you sure you want to proceed?')
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const clientTerminatedEmbed = new MessageEmbed()
            .setTitle('Terminated!')
            .setDescription('The client\'s connection to Discord has successfully been terminated!')
            .setColor('#ff0000')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)
        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription('The code you input is invalid!')
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        const terminationRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cancelTermination')
                    .setLabel('Cancel')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('confirmTermination')
                    .setLabel('Affirmative')
                    .setStyle('DANGER')
            )

        if (code === processedCode && currentUser.id === developer.id) {
            await interaction.reply({ content: null, embeds: [embedOptions], components: [terminationRow], ephemeral: true});

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'cancelTermination') {
                    const terminationRowCancelled = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('canceledTermination')
                                .setLabel('Canceled')
                                .setStyle('SUCCESS')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('terminationDisabled')
                                .setLabel('Affirmative')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    await i.update({ content: null, components: [terminationRowCancelled], ephemeral: true });
                }
                else if (i.customId === 'confirmTermination') {
                    const terminationRowConfirmed = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('terminationCancelDisabled')
                                .setLabel('Cancel')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                            new MessageButton()
                                .setCustomId('terminationConfirmed')
                                .setLabel('Terminated')
                                .setStyle('DANGER')
                                .setDisabled(true)
                        )
                    try {
                        await i.update({ content: null, embeds: [clientTerminatedEmbed], components: [terminationRowConfirmed], ephemeral: true });
                        await interaction.client.destroy();
                    } catch (error) {
                        return i.update(`Failed to terminate the client.\nError - ${error}`)
                    }
                }
            });
        } else if (code !== processedCode) {
            await interaction.reply({ content: null, embeds: [embedFailure], ephemeral: true});
        } else {
            await interaction.reply({ content: "...", ephemeral: true });
        }
    }
}