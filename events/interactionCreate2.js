const {EmbedBuilder, InteractionType} = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {

    if (interaction.type !== InteractionType.ModalSubmit) return;
	if (interaction.customId === 'myModal') {

        const favoriteColor = interaction.fields.getTextInputValue('suggestT');
	const hobbies = interaction.fields.getTextInputValue('suggestI');

    const embed = new EmbedBuilder()
			.setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`Suggestion made by ${interaction.user.tag}`)
            .addFields({
                name: `${favoriteColor}`,
                value: `${hobbies}`
            })
			.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))

            interaction.channel.send({embeds: [embed]})
            interaction.reply({ content: 'Done', ephemeral: true });
        }
    }
}