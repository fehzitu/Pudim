// node normal importations
const fs = require('node:fs');
const path = require('node:path');

// discord importations
const Discord = require('discord.js');
const Token = require('./config.json');

// import all intents
const { Client, GatewayIntentBits } = require('discord.js');

// get all the bot intents once
const client = new Client({
    intents: Object.values(GatewayIntentBits)
});

// new client commands instance (BOT)
client.commands = new Discord.Collection();
// "commands" is the main folder to all the slash commands
const commandsFoldersPath = path.join(__dirname, 'commands');
// define the "commands" folder
const commandsFolders = fs.readdirSync(commandsFoldersPath);

// registering each folder within the main command folder
for (const folder of commandsFolders) {
    // (commandsPath) defines each folder as a path to a group of commands
    const commandsPath = path.join(commandsFoldersPath, folder);
    // (commandsFiles) defines each file to be a command (.js file)
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandsFiles) {
        // (commandsFilePath) defining the path of each command
        const commandsFilePath = path.join(commandsPath, file);
        // (command) defining each command
        const command = require(commandsFilePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[🔴] Comando em: [${filePath}] está com os dados: "data" ou "execute" em falta! [🔴]`);
        };
    };
};

// new client events instance (BOT)
client.events = new Discord.Collection();
// "events" is the main folder to all the chat events
const eventsFoldersPath = path.join(__dirname, 'events');
// define the "events" folder
const eventsFolders = fs.readdirSync(eventsFoldersPath);

// registering each folder within the main chat event folder
for (const folder of eventsFolders) {
    // (eventsPath) defines each folder as a path to a group of chat events
    const eventsPath = path.join(eventsFoldersPath, folder);
    // (eventsFiles) defines each file to be a chat event (.js file)
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        // (filePath) defining the path of each chat event
        const filePath = path.join(eventsPath, file);
        // (event) defining each event
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        };
    };
};

// login with bot data/info
client.login(Token.token);