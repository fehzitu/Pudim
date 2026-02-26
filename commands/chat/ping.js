const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),

    async execute(interaction) {
        // set the main message to be send
        const sent = await interaction.reply({
            content: '🏓 Pong!',
            fetchReply: true
        });

        // get the bot latency
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        // edit the main message
        await interaction.editReply(
            `🏓 Pong!\n📡 Latência: ${latency}ms`
        );
    }
};