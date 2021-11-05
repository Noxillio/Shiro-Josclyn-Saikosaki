const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const slapGIF = ["https://media1.tenor.com/images/74db8b0b64e8d539aebebfbb2094ae84/tenor.gif", "https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif", "https://media1.tenor.com/images/53d180f129f51575a46b6d3f0f5eeeea/tenor.gif", "https://media1.tenor.com/images/7437caf9fb0bea289a5bb163b90163c7/tenor.gif", "https://media1.tenor.com/images/b7a844cc66ca1c6a4f06c266646d070f/tenor.gif", "https://media1.tenor.com/images/53f7a45f41b45f46c9a6c4dc154e58c5/tenor.gif", "https://media1.tenor.com/images/b221fb3f50f0e15b3ace6a2b87ad0ffa/tenor.gif", "https://media1.tenor.com/images/dcd359a74e32bca7197de46a58ec7b72/tenor.gif", "https://media1.tenor.com/images/e8f880b13c17d61810ac381b2f6a93c3/tenor.gif", "https://media1.tenor.com/images/153b2f1bfd3c595c920ce60f1553c5f7/tenor.gif", "https://media1.tenor.com/images/1ba1ea1786f0b03912b1c9138dac707c/tenor.gif", "https://media1.tenor.com/images/477821d58203a6786abea01d8cf1030e/tenor.gif", "https://media1.tenor.com/images/fb17a25b86d80e55ceb5153f08e79385/tenor.gif", "https://media1.tenor.com/images/0860d681fbe7ad04a2f39735ab939176/tenor.gif", "https://media1.tenor.com/images/10e77248b56ff4d874c3d0f14cfcad17/tenor.gif", "https://media1.tenor.com/images/afcb3e72257b6710cc618cafb4f498dd/tenor.gif", "https://media1.tenor.com/images/299366efafc95bc46bfd2f9c9a46541a/tenor.gif", "https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif", "https://media1.tenor.com/images/b797dce439faddabca83352b2c2de550/tenor.gif"];

function choose(choices) {
    index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap somebody (virtually).')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The target user.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason.')
                .setRequired(false)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const GIF = choose(slapGIF);

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSlap = new MessageEmbed()
            .setDescription(`${currentMember} slapped ${targetUser}.\nReason: ${reason}`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage(GIF)

        if (currentUser.id === targetUser.id) {
            await interaction.reply({ content: `Woah, I do not condone self-harm, ${currentUser}.`, ephemeral: true });
        } else if (currentUser.id !== targetUser.id) {
            await interaction.reply({ content: null, embeds: [embedSlap] });
        }
    }
}