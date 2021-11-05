const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const registered = ["635673822934204417"]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Direct message a specified user. [Exclusive]')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('msg')
                .setDescription('The message you want sent to the target user.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const author = interaction.user;
        const currentGuild = interaction.guild;
        const targetUser = interaction.options.getUser('user');
        const authorMessage = interaction.options.getString('msg');

        const isBot = new MessageEmbed()
            .setTitle('To Be Advised!')
            .setDescription(`The target user (${targetUser}) is a bot account and cannot be messaged!\n[████\_\_\_\_\_\_]`)
            .setColor('#f80000')

        const notOwner = new MessageEmbed()
            .setTitle(':x: | Request (Failure)!')
            .setDescription(`Your account (${author}) is not registered to use this command!`)
            .setColor('#ff0000')

        // Fetching
        await interaction.reply({ content: `:cd: | Fetching data...\n[         ]`, ephemeral: true});
        await sleep(1500)
        await interaction.editReply({ content: `:dvd: | Checking account registration...\n[█\_\_\_\_\_\_\_\_\_]` });
        await sleep(1500)

        try {
            for (const userId of registered) {
                if (author.id === userId) {
                    await interaction.editReply(`:cd: | Account found (registered).\n[███\_\_\_\_\_\_\_]`);
                    await sleep(1500);
                    await interaction.editReply(`:dvd: | Checking target user...\n[████\_\_\_\_\_\_]`);
                    await sleep(1500)
                    if (targetUser.bot) {
                        await interaction.editReply({ content: `Error!`, embeds: [isBot] });
                    } else if (!targetUser.bot) {
                        await interaction.editReply(`:cd: | Validated non-bot account.\n[█████\_\_\_\_]`);
                        await sleep(1500);
                        await interaction.editReply(`:outbox_tray: | Sending message...\n[██████\_\_\_]`);
                        await sleep(1500);
                        await interaction.editReply(`:outbox_tray: | Sending message...\n[████████\_\_]`);
                        await sleep(1500);
                        try {
                            await targetUser.send(authorMessage);
                            await sleep(1500);
                            await interaction.editReply(`:white_check_mark: | Message sent!\n[██████████]\n\nYour message to ${targetUser} is: ${authorMessage}`);
                        } catch (error) {
                            await interaction.editReply(`:x: | Message failed!\n[█████████\_]\nError - \`${error}\``);
                        }
                    }
                } else if (author.id !== userId) {
                    await interaction.editReply(`:x: | Failure (Account not found)!\n[█\_\_\_\_\_\_\_\_\_]`)
                }

            }
        } catch (error) {
            console.log(error);
        }
    }
}