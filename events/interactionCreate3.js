const {EmbedBuilder, InteractionType} = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

	if (interaction.type != InteractionType.ApplicationCommandAutocomplete) return;

		if (interaction.commandName == 'help') {
			const focusedOption = interaction.options.getFocused();
			let choices = interaction.client.commands.map(command => command.data.name)
			const filtered = choices.filter(choice => choice.startsWith(focusedOption));
			await interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
		}
	}
}