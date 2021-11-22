const {SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permissions')
        .setDescription('Checks permissions.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target user.')
                .setRequired(true)    
        ),
    async execute(interaction) {
        const shiroSaikosaki = interaction.client.user;
        const currentGuild = interaction.guild;
        const currentMember = interaction.member;
        const currentUser = interaction.user;
        const user = interaction.options.getUser('user');
        const targetUser = interaction.client.users.cache.get(user);

        // Permissions
        const permissionAddReactions = new Boolean(targetUser.permissions.has(Permissions.FLAGS.ADD_REACTIONS));
        const permissionAdministrator = new Boolean(targetUser.permissions.has(Permissions.FLAGS.ADMINISTRATOR));
        const permissionAttachFiles = new Boolean(targetUser.permissions.has(Permissions.FLAGS.ATTACH_FILES));
        const permissionBan = new Boolean(targetUser.permissions.has(Permissions.FLAGS.BAN_MEMBERS));
        const permissionConnect = new Boolean(targetUser.permissions.has(Permissions.FLAGS.CONNECT));
        const permissionCreateInvites = new Boolean(targetUser.permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE));
        const permissionDeafenMembers = new Boolean(targetUser.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS));
        const permissionEmbedLinks = new Boolean(targetUser.permissions.has(Permissions.FLAGS.EMBED_LINKS));
        const permissionKick = new Boolean(targetUser.permissions.has(Permissions.FLAGS.KICK_MEMBERS));
        const permissionManageChannels = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS));
        const permissionManageEmojisAndStickers = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS));
        const permissionManageGuild = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_GUILD));
        const permissionManageMessages = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES));
        const permissionManageNicknames = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES));
        const permissionManageRoles = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_ROLES));
        const permissionManageThreads = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_THREADS));
        const permissionManageWebhooks = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MANAGE_WEBHOOKS));
        const permissionMentionEveryone = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MENTION_EVERYONE));
        const permissionMoveMembers = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MOVE_MEMBERS));
        const permissionMuteMembers = new Boolean(targetUser.permissions.has(Permissions.FLAGS.MUTE_MEMBERS));
        const permissionNickname = new Boolean(targetUser.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME));
        const permissionPrioritySpeaker = new Boolean(targetUser.permissions.has(Permissions.FLAGS.PRIORITY_SPEAKER));
        const permissionReadMessageHistory = new Boolean(targetUser.permissions.has(Permissions.FLAGS.READ_MESSAGE_HISTORY));
        const permissionRequestToSpeak = new Boolean(targetUser.permissions.has(Permissions.FLAGS.REQUEST_TO_SPEAK));
        const permissionSpeak = new Boolean(targetUser.permissions.has(Permissions.FLAGS.SPEAK));
        const permissionStream = new Boolean(targetUser.permissions.has(Permissions.FLAGS.STREAM));
        const permissionUseApplicationCommands = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_APPLICATION_COMMANDS));
        const permissionUseExternalEmojis = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS));
        const permissionUseExternalStickers = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_EXTERNAL_STICKERS));
        const permissionUsePrivateThreads = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_PRIVATE_THREADS));
        const permissionUsePublicThreads = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_PUBLIC_THREADS));
        const permissionUseVAD = new Boolean(targetUser.permissions.has(Permissions.FLAGS.USE_VAD));
        const permissionViewAuditLog = new Boolean(targetUser.permissions.has(Permissions.FLAGS.VIEW_AUDIT_LOG));
        const permissionViewChannel = new Boolean(targetUser.permissions.has(Permissions.FLAGS.VIEW_CHANNEL));
        const permissionViewGuildInsights = new Boolean(targetUser.permissions.has(Permissions.FLAGS.VIEW_GUILD_INSIGHTS));

        // Embed
        const resultsEmbed = new MessageEmbed()
            .setTitle(`:bust_in_silhouette: | ${targetUser.tag}'s Permissions`)
            .setDescription(`**Add reactions:** \`${permissionAddReactions}\`\n**Administrator:** \`${permissionAdministrator}\`\n**Attach files:** \`${permissionAttachFiles}\`\n**Ban members:** \`${permissionBan}\`\n**Connect:** \`${permissionConnect}\`\n**Create invites:** \`${permissionCreateInvites}\`\n**Deafen members:** \`${permissionDeafenMembers}\`\n**Embed links:** \`${permissionEmbedLinks}\`\n**Kick members:** \`${permissionKick}\`\n**Manage channels:** \`${permissionManageChannels}\`\n**Manage emojis & stickers:** \`${permissionManageEmojisAndStickers}\`\n**Manage server:** \`${permissionManageGuild}\`\n**Manage messages:** \`${permissionManageMessages}\`\n**Manage nicknames:** \`${permissionManageNicknames}\`\n**Manage roles:** \`${permissionManageRoles}\`\n**Manage threads:** \`${permissionManageThreads}\`\n**Manage webhooks:** \`${permissionManageWebhooks}\`\n**Mention everyone:** \`${permissionMentionEveryone}\`\n**Move members:** \`${permissionMoveMembers}\`\n**Mute members:** \`${permissionMuteMembers}\`\n**Update nickname (self):** \`${permissionNickname}\`\n**Priority speaker:** \`${permissionPrioritySpeaker}\`\n**Read message history:** \`${permissionReadMessageHistory}\`\n**Request to speak:** \`${permissionRequestToSpeak}\`\n**Speak:** \`${permissionSpeak}\`\n**Stream:** \`${permissionStream}\`\n**Use application commands:** \`${permissionUseApplicationCommands}\`\n**Use external emojis:** \`${permissionUseExternalEmojis}\`\n**Use external stickers:** \`${permissionUseExternalStickers}\`\n**Use private threads:** \`${permissionUsePrivateThreads}\`\n**Use public threads:** \`${permissionUsePublicThreads}\`\n**Use VAD (Voice Activity Detection):** \`${permissionUseVAD}\`\n**View audit log:** \`${permissionViewAuditLog}\`\n**View channel:** \`${permissionViewChannel}\`\n**View server insights:** \`${permissionViewGuildInsights}\``)
            .setColor('#c21313')
            .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 1024 })}`)

            const embedNotReady = new MessageEmbed()
                .setTitle('To Be Advised!')
                .setDescription(`This command is not ready yet, ${currentUser}!`)
                .setColor('#c21313')
                .setAuthor(`${shiroSaikosaki.tag}`, `${shiroSaikosaki.avatarURL({ format: "png", size: 512 })}`)

        await interaction.reply({ content: null, embeds: [embedNotReady], ephemeral: true });
    }
}