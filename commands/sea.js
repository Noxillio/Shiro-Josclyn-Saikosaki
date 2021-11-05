const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sea')
        .setDescription('Send an embed announcement/message.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the embed.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description of the embed.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Embed color. | Add # first before six-character code. Example: #ff0000')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentGuildMember = interaction.member;
        const currentGuild = interaction.guild;

        const embedTitle = interaction.options.getString('title');
        const embedDescription = interaction.options.getString('description');
        const embedColor = interaction.options.getString('color');

        // Embeds
        const seaEmbed = new MessageEmbed()
            .setTitle(embedTitle)
            .setDescription(embedDescription)
            .setColor(embedColor)
            .setAuthor(`${currentUser.tag}`, `${currentUser.avatarURL({ format: "png", size: 512 })}`)

        const missingPermissionsEmbed = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription(`You (${currentGuildMember}) do not have permission to execute this command.`)
            .setColor('#ff0000')
            .setAuthor(`${interaction.client.user.tag}`, `${interaction.client.user.avatarURL({ format: "png", size: 512 })}`)

        if (currentGuildMember.permissions.has(Permissions.FLAGS.ADMINISTRATOR || Permissions.FLAGS.MANAGE_GUILD)) {
            await interaction.reply({ content: null, embeds: [seaEmbed], ephemeral: false });
        } else if (!currentGuildMember.permissions.has(Permissions.FLAGS.ADMINISTRATOR || Permissions.FLAGS.MANAGE_GUILD)) {
            await interaction.reply({ content: null, embeds: [missingPermissionsEmbed], ephemeral: true });
        }
    }
}