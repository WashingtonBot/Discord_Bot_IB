const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
const commandsPath1 = path.join(__dirname, 'context')
const commandFiles1 = fs.readdirSync(commandsPath1).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

for (const file of commandFiles1) {
	const filePath = path.join(commandsPath1, file);
	const command = require(filePath);
	commands.push(command.data.toJSON())

}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands})
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)

