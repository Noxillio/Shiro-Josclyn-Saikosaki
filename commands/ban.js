const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, UserFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a target user.')
        .addUserOption(option =>
            option.setName('banuser')
                .setDescription('Ban the target user (SJS).')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('banreason')
                .setDescription('Reason to ban target user.')  
                .setRequired(false)  
        ),
    async execute(interaction) {
        const banTarget = interaction.options.getMember('banuser');
        const banReason = interaction.options.getString('banreason');
        const author = interaction.member;
        if (author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const banRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('banCancel')
                        .setLabel('Cancel')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('banConfirm')
                        .setLabel('Ban')
                        .setStyle('DANGER')
                )
            await interaction.reply({ content: "Set!", components: [banRow], ephemeral: true });
        }
        else if (!author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const banEmbedFail = new MessageEmbed()
                .setTitle('Notice!')
                .setDescription(`An error has occurred!\nYou (${author.tag}) do not have the proper permission(s) (\`BAN_MEMBERS\`) to execute this command!`)
            await interaction.reply({ content: "Notice!", embeds: [banEmbedFail], ephemeral: true });
        }
    }
}