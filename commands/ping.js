const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('the bot ping'),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
	    interaction.editReply(`Ping: ${interaction.client.ws.ping}ms.\nAPI Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}