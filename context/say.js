const {ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType} = require('discord.js')

module.exports = {
data: new ContextMenuCommandBuilder()
	.setName('Say')
	.setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const message = interaction.options.getMessage('message');
		return interaction.reply(`${message}`);

    }
}