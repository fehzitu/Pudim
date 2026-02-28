// discord implements
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),
    async execute(interaction) {
        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle('**🏓 Pong!**')
            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
            .addFields({
                name: "**Tempo de resposta da API.**",
                value: "**100ms.**"
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