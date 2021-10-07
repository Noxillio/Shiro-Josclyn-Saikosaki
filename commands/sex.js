const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

const sexGIF = ["https://cdnio.luscious.net/StoneyMoe/364420/classic_180_01E07K5C5PTNAD21KEYASWHXHB.gif", "https://78.media.tumblr.com/65ee5a341b7496e6ddedf4e421ad178c/tumblr_ohw7xjeOF01vmjsu9o1_500.gif", "https://68.media.tumblr.com/a0b2c2a4ae94ade8866f257b7301bae9/tumblr_on37aqMaJf1v2hfg0o1_500.gif", "https://hentaiporns.net/wp-content/uploads/2018/03/6018335-ae65d2b71ad6ec6a3e13969d9a41d644.gif", "https://i.pinimg.com/originals/a8/01/59/a80159dc63f879e347bce0240af22b8e.gif", "https://x.imagefapusercontent.com/u/demonknightxxx/4934275/1913599662/1.gif", "https://thumb-p1.xhcdn.com/a/-ulWnDewlXpnLLT6FlTmiQ/000/087/503/281_450.gif", "https://tbib.org//images/714/ef821a8676647e81bb4e38b26f8a961a1b919bf1.gif", "https://66.media.tumblr.com/tumblr_mbgjwdYHPg1rrsoino1_500.gif",
"https://68.media.tumblr.com/a2ba2a004fd625bfc882689f2f51ac40/tumblr_o7zyvcYP9E1vuygyao1_500.gif", "https://hentaiporns.net/wp-content/uploads/2018/02/6052344-197abe81f80faf60e6d5d9a10e44d332.gif", "https://img2.gelbooru.com/images/3c/f9/3cf972b92dfbb4f45d6f98ee5ecd6213.gif", "https://78.media.tumblr.com/67fa09546aeff7a321fa6d1870d84a55/tumblr_oa1sqwsZS51v2hfg0o9_500.gif", "https://img1.gelbooru.com/images/3a/18/3a1896872f1a4b0e12ec2bdde963d168.gif", "https://i.imgur.com/70Snago.gif", "https://68.media.tumblr.com/0a835f65401266b81bdd9982b561fc52/tumblr_o3wbjdaK8f1sv44ewo2_1280.gif"];

function choose(choices) {
    index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sex')
        .setDescription('Have sexual intercourse with somebody (virtually).')
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
        const developer = interaction.client.users.cache.get('635673822934204417');
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const GIF = choose(sexGIF);

        const embedFailure = new MessageEmbed()
            .setTitle(':x: | Failure!')
            .setDescription(`To be advised: An error has occurred while trying to execute this command. Possible issues:\n- Lacking/missing the proper permission(s).\n- The command malfunctioned.\n- Bot is missing permission(s).`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedSex = new MessageEmbed()
            .setDescription(`${currentMember} is having sex with ${targetUser}.\nReason: ${reason}`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
            .setImage(GIF)

        const embedWarning = new MessageEmbed()
            .setTitle(':warning: | Failure - Warning!')
            .setDescription(`To be advised: The command you are trying to execute is a NSFW-based command and cannot be used in non-nsfw marked channels.`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        if (interaction.channel.nsfw) {
            if (currentUser.id === targetUser.id) {
                await interaction.reply({ content: `Would you really have sexual intercourse with yourself?`, ephemeral: true });
            } else if (currentUser.id !== targetUser.id) {
                if (targetUser.id === shiroSaikosaki.id && currentUser.id !== developer.id) {
                    await interaction.reply({ content: `No.`, ephemeral: true });
                } else if (targetUser.id !== shiroSaikosaki.id || currentUser.id === developer.id) {
                    await interaction.reply({ content: null, embeds: [embedSex] });
                }
            }
        } else if (!interaction.channel.nsfw) {
            await interaction.reply({ content: null, embeds: [embedWarning], ephemeral: true });
        }
    }
}