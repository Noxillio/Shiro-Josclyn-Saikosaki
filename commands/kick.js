const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions, GuildMember } = require('discord.js');
const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick the specified user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user (SJS).')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const author = interaction.member;
        if (interaction.guild.available === true) {
            if (author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const kickTarget = interaction.options.getMember('user');
                const kickReason = interaction.options.getString('reason');

                try {
                    await kickTarget.send({ content: `You have been kicked from **${interaction.guild.name}** by ${author}!\nReason: ${kickReason}`, ephemeral: true });
                } catch (error) {
                    console.error(error)
                    await interaction.reply({ content: `Error: I could not notify ${kickTarget} about their removal from the server.`, ephemeral: true });
                }
                finally {
                    await interaction.guild.members.kick(kickTarget, [kickReason] );
                    const kickEmbed = new MessageEmbed()
                        .setTitle(':white_check_mark: | Success!')
                        .setDescription(`**${kickTarget}** has been kicked successfully from the server!`)
                        .setColor('#00ff00')
                    await interaction.reply({ content: "Notice!", embeds: [kickEmbed], ephemeral: true });
                }
            }
            else if (!author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const kickEmbedFail = new MessageEmbed()
                    .setTitle('Notice!')
                    .setDescription(`An error has occurred!\nYou (${author}) do not have the proper permission(s) (\`KICK_MEMBERS\`) to execute this command!`)

                await interaction.reply({ content: "Notice!", embeds: [kickEmbedFail], ephemeral: true });
            }
        } else {
            await interaction.reply('Error: The server may be unavilable.')
        }
    }
}