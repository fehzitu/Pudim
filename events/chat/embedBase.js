// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/embed.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // get the content
        const content = message.content.toLowerCase();

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // create an embed
        const embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTitle(data.title)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields(data.field)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // checking the regex
        if (content == 'k.embed') {
            const response = await message.reply({
                embeds: [embed]
            });
        };
    }
};