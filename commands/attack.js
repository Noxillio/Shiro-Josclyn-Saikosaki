const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');


function choose(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('attack')
        .setDescription('Attack a user (virtually).')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('If true, the outcome will be public.')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for attacking.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const developer = interaction.client.users.cache.get('635673822934204417');
        const targetUser = interaction.options.getUser('user');
        const isEphemeral = interaction.options.getBoolean('ephemeral');
        const reason = interaction.options.getString('reason');

        const gifFiles = [
            "https://media1.tenor.com/images/21e6715241ca69af3c63f24cd630521f/tenor.gif",
            "https://media1.tenor.com/images/4836ad54d241aa547612522e2f48d737/tenor.gif",
            "https://media1.tenor.com/images/1499818b185f924046fe482743597490/tenor.gif",
            "https://media1.tenor.com/images/aab5b5da693dd6e79d9b629079aa2fc7/tenor.gif",
            "https://media1.tenor.com/images/c1d0f0416cbf59c3c4e6d07c03352464/tenor.gif",
            "https://media1.tenor.com/images/e835c9ce61aeba668eae3b6eaa5eb2be/tenor.gif",
            "https://media1.tenor.com/images/959a2880c5d10e1a0508c7309a2dce51/tenor.gif",
            "https://media1.tenor.com/images/60596ff11a5c712c132411c5ff4200bb/tenor.gif",
            "https://media1.tenor.com/images/2d857547678ce7e1ed06e5e2f676e5e4/tenor.gif",
            "https://media1.tenor.com/images/731fe853aa69667a44710e4cd3f0e72e/tenor.gif",
            "https://media1.tenor.com/images/18c9d1425138ecb5dd55f789e3a26ea5/tenor.gif",
            "https://media1.tenor.com/images/90a13dba11d0c4acf5761ccc82e976a2/tenor.gif",
            "https://media1.tenor.com/images/528b2e41f027360e3a88db5934dbb9af/tenor.gif",
            "https://media1.tenor.com/images/dfc5f41115d3d07c7ffdd437349b2db5/tenor.gif"
        ];

        const titles = [
            "Attack!",
            "Time To Change Fate!",
            "The End Has Come!",
            "Watch This!",
            "Now I'm Mad!",
            "On My Mark!",
            "I'm Not Done Yet!",
            "The End Approaches!"
        ];

        const optionsColor = [
            "#c21313",
            "#c21313",
            "#c21313",
            "#c21313",
            "#716fff",
            "#c21313",
            "#c21313",
            "#c21313",
            "#c21313",
            "#c21313"
        ];

        const punishTitle = [
            "Awful!",
            "Unnecessary!",
            "Pathetic!",
            "I Do Not Condone!",
            "You Could Have Done So Much Better!"
        ];

        const punishGIF = [
            "https://i.ibb.co/xMWV9xq/That-Was-Stupid.gif"
        ];

        const selectedGIF = choose(gifFiles); 
        const selectedTitle = choose(titles);
        const embedColor = choose(optionsColor);
        const selectedPunishGIF = choose(punishGIF);
        const selectedPunishTitle = choose(punishTitle);

        const embedSuccess = new MessageEmbed()
            .setTitle(`${selectedTitle}`)
            .setDescription(`${currentUser} has attacked ${targetUser}!\nReason: ${reason}`)
            .setColor(embedColor)
            .setImage(selectedGIF)

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Error - Failure!')
            .setDescription('Unknown issue.')
            .setColor('#ff0000')

        const embedPunish = new MessageEmbed()
            .setTitle(`${punishTitle}`)
            .setDescription(`${currentUser} made a mistake trying to attack themselves.\nReason: There is no valid reason for this action.`)
            .setColor('#ff0000')
            .setImage(selectedPunishGIF)

        try {
            if (targetUser.id === currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedPunish], ephemeral: false });
            } else if (targetUser.id !== currentUser.id) {
                await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: isEphemeral });
            }
        } catch (error) {
            const embedError = new MessageEmbed()
                .setTitle(':x: | Error - Failure!')
                .setDescription(`Error --> ${error}`)
                .setColor('#ff0000')
            await interaction.reply({ content: null, embeds: [embedError], ephemeral: true });
        }
    }
}