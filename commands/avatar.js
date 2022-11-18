const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show').setRequired(true)),
		
	async execute(interaction) {
		const user = interaction.options.getUser('target');
			const embed = new EmbedBuilder()
				.setTitle(`Avatar de ${user.username}`)
				.setDescription('Incredible !')
				.setColor('Random')
				.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
		return interaction.reply({ embeds: [embed] });


	},
};