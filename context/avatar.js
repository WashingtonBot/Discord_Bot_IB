const {ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType} = require('discord.js')

module.exports = {
  data: new ContextMenuCommandBuilder()
	.setName('Avatar')
	.setType(ApplicationCommandType.User),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setDescription('Incredible !')
            .setColor('Random')
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))


     
    return interaction.reply({ embeds: [embed] })
    },
}