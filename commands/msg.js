const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, IntegrationApplication } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('msg')
        .setDescription('Send messages as the bot.')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Data.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const developer = interaction.client.users.cache.get('779799406412693545');
        const msgContent = interaction.options.getString('content');

        const developerId = ["779799406412693545"];

        const embedFailure = new MessageEmbed()
            .setTitle('[:x:] | Failure!')
            .setDescription(`Your account (${currentUser}) is not registered to this command [Developer exclusive]!`)
            .setColor('#ff0000')

        for (const id of developerId) {
            if (currentUser.id === id) {
                await interaction.reply({ content: `Break! [End of code.]`, embeds: null, ephemeral: true });
                try {
                    await interaction.channel.send({ content: msgContent });
                } catch (error) {
                    await interaction.editReply({ content: `Error - \`${error}\``, embeds: null, ephemeral: true });
                } break;
            } else if (currentUser.id !== id) {
                await interaction.reply({ content: null, embeds: [embedFailure], ephemeral: true });
            } break;
        }
    }
}