const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,
    execute(client) {

        // count
        let i = 0;

        // all the main status
        const activities = [
            '{ https://discord.gg/PPhhJgAFRF }',
            'Pudim melhor comunidade'
        ];

        // switch status every x seconds
        setInterval(() => {
            client.user.setActivity(activities[i], {
                type: Discord.ActivityType.Playing
            });

            i = (i + 1) % activities.length;

        }, 10000);

        // log
        console.log(`${client.user.tag} logado com sucesso!`);
    }
};