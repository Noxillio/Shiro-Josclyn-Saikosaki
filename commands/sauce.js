const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Collection } = require('discord.js');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function choose(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sauce')
        .setDescription('NSFW command - blocked in sfw servers.')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('If True, this will hide the outcome.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentUser = interaction.user;
        const currentGuild = interaction.guild;
        const isEphemeral = interaction.options.getBoolean('ephemeral');

        const blacklistedDiscords = ["385378814584422413"];

        const sauceFile = [
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540207/assets/media/images/nsfw/neko_tease.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540184/assets/media/images/nsfw/sauce_tease.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540184/assets/media/images/nsfw/Kurumi_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540183/assets/media/images/nsfw/sauce_show.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540183/assets/media/images/nsfw/in_bed_show.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540183/assets/media/images/nsfw/Kurumi_top_and_bottom_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540182/assets/media/images/nsfw/Zero_two.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540182/assets/media/images/nsfw/Zero_two_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540182/assets/media/images/nsfw/intercourse_ready.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540182/assets/media/images/nsfw/squirt.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/teasing_angel.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/nervous_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/woman_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/sleeping_top_off.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/beg.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540181/assets/media/images/nsfw/asking_for_it.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540180/assets/media/images/nsfw/innocent_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540180/assets/media/images/nsfw/it_is_what_it_is.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540179/assets/media/images/nsfw/in-bed_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540179/assets/media/images/nsfw/nudity.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540179/assets/media/images/nsfw/F7597029.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540178/assets/media/images/nsfw/89AE2B95.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540177/assets/media/images/nsfw/band-aids.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540176/assets/media/images/nsfw/leaking_fluid.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540176/assets/media/images/nsfw/bikini_tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540176/assets/media/images/nsfw/leaking_fluid_2.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540175/assets/media/images/nsfw/leaking_fluid_3.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540175/assets/media/images/nsfw/leverage.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540175/assets/media/images/nsfw/arms_way.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540175/assets/media/images/nsfw/girls%27%20front.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540175/assets/media/images/nsfw/Girls%27%20Frontier.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540174/assets/media/images/nsfw/tease_2.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540174/assets/media/images/nsfw/Girls%27%20Frontier%20Tease.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540173/assets/media/images/nsfw/7713774C.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540173/assets/media/images/nsfw/Mai%20Sakurajima.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540173/assets/media/images/nsfw/82C2AB0B.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540173/assets/media/images/nsfw/Girls%27%20Frontier%20-%20cumshot.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540172/assets/media/images/nsfw/E4DBF096.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540172/assets/media/images/nsfw/8ADB2C6.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540172/assets/media/images/nsfw/8BBA4D0C.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540172/assets/media/images/nsfw/6C079073.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540171/assets/media/images/nsfw/7DA44C2A-FAAC-464C-9982-0E2164B16672_mqjqht.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540170/assets/media/images/nsfw/6858520A.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540169/assets/media/images/nsfw/89030CE2.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540169/assets/media/images/nsfw/14FFBE4.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540168/assets/media/images/nsfw/2D7F24A5.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540167/assets/media/images/nsfw/D5FanotherOne.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540167/assets/media/images/nsfw/079BBFBE.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540166/assets/media/images/nsfw/Mai%20Sakurajima%20-%20cumshot.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540166/assets/media/images/nsfw/Mai%20Sakurajima%20-%20innocent.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540166/assets/media/images/nsfw/E5681155.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540166/assets/media/images/nsfw/57BDD303.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540166/assets/media/images/nsfw/64A729E2.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540165/assets/media/images/nsfw/Intercourse-takeover.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540165/assets/media/images/nsfw/544764A1.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540165/assets/media/images/nsfw/Byleth%20%28female%29.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540164/assets/media/images/nsfw/26AB526.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540164/assets/media/images/nsfw/514B14A8.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540164/assets/media/images/nsfw/semen%20on%20vagina..jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540164/assets/media/images/nsfw/EDFBD23.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540163/assets/media/images/nsfw/A2289ECB.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540163/assets/media/images/nsfw/7A31D51C.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540162/assets/media/images/nsfw/9F1E2B77.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540162/assets/media/images/nsfw/5C6E2E4B.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540162/assets/media/images/nsfw/5E5CF6A6.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540162/assets/media/images/nsfw/DB75947A.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540161/assets/media/images/nsfw/5D20EFB5.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540160/assets/media/images/nsfw/Amber.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540160/assets/media/images/nsfw/Mai%20Sakurajima%20-%20innocent%202.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540160/assets/media/images/nsfw/Keqing.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540160/assets/media/images/nsfw/AC03B859.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540159/assets/media/images/nsfw/Hu%20Tao.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540159/assets/media/images/nsfw/766ACD14.png",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636540157/assets/media/images/nsfw/5224739F.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625670/assets/media/images/nsfw/Neko%20and%20her%20oppai%21.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625668/assets/media/images/nsfw/Nekopara.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625667/assets/media/images/nsfw/DateALive_Kurumi_1.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625667/assets/media/images/nsfw/DateALive_Kurumi_4.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625666/assets/media/images/nsfw/DateALive_Kurumi_2.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625666/assets/media/images/nsfw/DateALive_Kurumi_3.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625666/assets/media/images/nsfw/uncensored-animeGirl_nude.jpg",
            "https://res.cloudinary.com/laneko-server-y2021m11d09/image/upload/v1636625666/assets/media/images/nsfw/DateALive_Kurumi.jpg"
        ]

        const embedWrongChannel = new MessageEmbed()
            .setTitle(':warning: | NOTICE!')
            .setDescription(`To be advised: This command can only be executed successfully in NSFW-labeled channels!`)
            .setColor('#c21313')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        const embedDiscordBlacklisted = new MessageEmbed()
            .setTitle(':x: | NOTICE!')
            .setDescription(`To be advised: This Discord (**${currentGuild.name}**) is black-listed from NSFW commands and is labeled as SFW (Safe For Work), even in NSFW-marked channels, this command will not execute successfully in this server. To use this command, you must transfer to a non-black-listed Discord.!`)
            .setColor('#ff0000')
            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))

        for (const blacklistedDiscord of blacklistedDiscords) {
            try {
                if (currentGuild.id === blacklistedDiscord) {
                    await interaction.reply({ content: null, embeds: [embedDiscordBlacklisted], ephemeral: true });
                } else if (currentGuild.id !== blacklistedDiscord) {
                    if (interaction.channel.nsfw) {
                        const selectedSauce = choose(sauceFile);

                        const embedSuccess = new MessageEmbed()
                            .setTitle('Here is the sauce!')
                            .setColor('#c21313')
                            .setAuthor(shiroSaikosaki.tag, shiroSaikosaki.avatarURL({ format: "png", size: 512 }))
                            .setImage(selectedSauce)

                        await interaction.reply({ content: null, embeds: [embedSuccess], ephemeral: isEphemeral });
                    } else if (!interaction.channel.nsfw) {
                        await interaction.reply({ content: null, embeds: [embedWrongChannel], ephemeral: true });
                    }
                }
            } catch (error) {
                await interaction.reply({ content: `Error - ${error}`, ephemeral: true });
                console.log(error)
            }
        }
    }
}