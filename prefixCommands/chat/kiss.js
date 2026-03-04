// discord implements
const Discord = require('discord.js');

// node file system
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'complements/kiss.json');

module.exports = {
    // "name" will receive the value that will be the chat message that the bot captures as a command
    name: 'beijar',
    async execute(message) {
        // check if an bot has send the message
        if (message.author.bot) return;

        // get the message content splitted and in lower case
        const content = message.content.toLowerCase().split(' ');

        // get the first mentioned user id in string (without <@ >)
        const firstMentionedUser = message.mentions.users.first();

        // reading the file in real time
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        // variable to save the api img url
        let imgUrl = '';

        // function to get the api img
        const getImg = async (args) => {
            // get the image from an external API
            const fetchApi = await fetch(`https://api.waifu.pics/sfw/${args}`);
            imgUrl = await fetchApi.json();
        };

        // create an errorEmbed
        const errorEmbed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .addFields(data.error)
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // create an successEmbed
        const successEmbed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: `${message.author.displayAvatarURL()}`,
                name: `@${message.author.username}`
            })
            .setTimestamp()
            .setFooter({
                text: 'Atualizado'
            });

        // set the embed to a mentioned user
        if (content.length == 2 && firstMentionedUser) {
            // check if the user use kiss on him self
            if (message.author.id == firstMentionedUser.id) {
                // call the img function
                await getImg('cringe');

                // set the title of embed with mentioned username
                successEmbed.setDescription(`🤔 **<@${message.author.id}> se ama ao ponto de se beijar?**❓`);
                await successEmbed.setImage(imgUrl.url);
            } else {
                // call the img function
                await getImg('kiss');

                // set the title of embed with mentioned username
                successEmbed.setDescription(`😳 **<@${message.author.id}> beijou <@${firstMentionedUser.id}>**❗`);
                await successEmbed.setImage(imgUrl.url);
            };

            // response
            return await message.reply({
                embeds: [successEmbed]
            });
        } else {
            // response
            return await message.reply({
                embeds: [errorEmbed]
            });
        };
    }
};