const fetch = require('node-fetch');
const querystring = require('querystring');
const { type } = require('os');
const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('send a picture of a dog'),

    async execute(interaction) {
        const { message } = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());

		interaction.reply({files: [message]});
    }
}