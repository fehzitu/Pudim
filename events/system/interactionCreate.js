const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.InteractionCreate,
    async execute(interaction) {
        // check if the command is an chat interaction
        if (!interaction.isChatInputCommand()) return;

        // get the command name
        let command = await interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`[🔴] Não foi encontrado um comando com o nome: "${interaction.commandName}"! [🔴]`);
            return;
        };

        // try execute command and handle every error
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            // check if it has already been answered / deferred
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '[🔴] Comando já respondido ou adiado [🔴]', flags: Discord.MessageFlags.Ephemeral
                });
            } else {
                // check if it not has already been answered / deferred
                await interaction.reply({
                    content: '[🔴] Nosso sistema demorou muito pra responde ou adiar a resposta [🔴]', flags: Discord.MessageFlags.Ephemeral
                });
            };
        };
    }
};