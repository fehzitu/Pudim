const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.MessageCreate,
    async execute(message) {
        // check if an bot send the message
        if (message.author.bot) return;

        // check the server and channel from the message
        const guildName = message.guild?.name ?? "DM";
        const channelName = message.channel?.name ?? "Direct Message";

        // log
        console.log(`
            User: 『 ${message.author.username} 』
            Guild & Channel: 『 ${guildName} : ${channelName} 』
            Message: 『 ${message.content} 』
        `);

        // testing log
        console.log(`[${new Date().toLocaleTimeString()}] ${message.author.tag} -> ${guildName} #${channelName}: ${message.content}`);
    }
};