// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/ping.json');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),
    async execute(interaction) {
        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${interaction.user.displayAvatarURL()}`,
                name: `@${interaction.user.username}`
            })
            .setTitle(data.title)
            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
            .addFields(data.field)
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