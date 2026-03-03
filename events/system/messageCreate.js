const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.MessageCreate,
    async execute(message) {
        // check if an bot send the message
        if (message.author.bot) return;

        // check the server and channel from the message
        const guildName = message.guild?.name ?? "DM";
        const channelName = message.channel?.name ?? "DM";

        // log
        console.log(`[${new Date().toLocaleTimeString()}] ${message.author.tag} -> ${guildName} #${channelName}: ${message.content}`);

		// commands prefix
        const prefix = "k.";

		// set lower case
        if (!message.content.toLowerCase().startsWith(prefix)) return;

		// get args from message content
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

		// get the command by the name
        const command = message.client.commands.get(commandName);
        if (!command) return;

		// handle error
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    }
};