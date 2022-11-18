const fetch = require('node-fetch');
const querystring = require('querystring');
const { type } = require('os');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('urban')
    .setDescription('urban dictionarry research')
    .addStringOption(option => option.setName('term').setDescription('the search').setRequired(true)),

    async execute(interaction) {

        const term = interaction.options.getString('term');
		const query = querystring.stringify({ term });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return interaction.reply(`No results found for **${term}**.`);
		}

		const [answer] = list;

		const embed = new EmbedBuilder()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		interaction.reply({ embeds: [embed] });
    }
}