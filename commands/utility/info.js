// discord implements
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('info')
        .setDescription('Mostra informações do bot!'),
    async execute(interaction) {
        // get bot info
        const client = interaction.client;

        // bot info
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const totalGuilds = client.guilds.cache.size;

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle('**🤖 Bot Information**')
            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
            .addFields({
                name: '👑 Bot Name',
                value: `**${client.user.tag}**`
            },
                {
                    name: '🆔 Bot ID',
                    value: `**${client.user.id}**`
                },
                {
                    name: '📡 Ping',
                    value: `**${client.ws.ping}ms**`
                },
                {
                    name: '🏠 Servers',
                    value: `**${totalGuilds}**`
                },
                {
                    name: '👥 Users',
                    value: `**${totalUsers}**`
                },
                {
                    name: '📚 Channels',
                    value: `**${totalChannels}**`
                },
                {
                    name: '⏳ Uptime',
                    value: `**${Math.floor(client.uptime / 1000)} seconds**`
                })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the main message to be send
        const response = await interaction.reply({
            embeds: [embed]
        });
    }
};