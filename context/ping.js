const {ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType} = require('discord.js')

module.exports = {
data: new ContextMenuCommandBuilder()
	.setName('Ping')
	.setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
	    interaction.editReply(`Ping: ${interaction.client.ws.ping}ms.\nAPI Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

    }
}