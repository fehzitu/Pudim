module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // catch the message content and set to lower case
        const content = message.content.toLowerCase();

        // check if the message has "!ping"
        if (content === '!pong') {
            // send this message as a response
            const msg = await message.reply('🏓 Pong!');

            // check the bot latency
            const latency = msg.createdTimestamp - message.createdTimestamp;

            // edit the main message and set the latency
            await msg.edit(`🏓 Pong!\n📡 Latência: ${latency}ms`);
        }
    },
};