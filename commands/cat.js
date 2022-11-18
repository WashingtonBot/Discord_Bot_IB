const {SlashCommandBuilder} = require('discord.js')
const fetch = require('node-fetch');
const querystring = require('querystring');
const { type } = require('os');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('send a cat photo'),

    async execute(interaction) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		interaction.reply({ files: [file] });

 }
}