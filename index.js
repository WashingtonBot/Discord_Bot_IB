const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, InteractionType } = require('discord.js');
const { token } = require('./config.json');
require('dotenv').config()
const mongoose = require('mongoose');


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences ]});



mongoose.connect(
	process.env.MONGO_URI,
	{
		keepAlive: true,
	}
).then(console.log('Connected to mongodb!'))


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



const commandsPath1 = path.join(__dirname, 'context');
const commandFiles1 = fs.readdirSync(commandsPath1).filter(file => file.endsWith('.js'));

for (const file of commandFiles1) {
	const filePath = path.join(commandsPath1, file);
	const command1 = require(filePath);
	client.commands.set(command1.data.name, command1);
}



client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenuCommand()) return;

	const command2 = client.commands.get(interaction.commandName);

	if (!command2) return;

	try {
		await command2.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



client.login(token);