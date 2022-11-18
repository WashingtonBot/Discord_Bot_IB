const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete a certain channel')
    .addSubcommand(subcommand =>
        subcommand
            .setName('channel')
            .setDescription('delete a channel')
            .addChannelOption(option => option.setName('channel').setDescription('which channel')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('messages')
            .setDescription('udeltes a certain amount of messages')
            .addNumberOption(option => option.setName('number').setDescription('how many').setRequired(true))),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'channel') {
        const channel = interaction.options.getChannel('channel')
        if (channel) return channel.delete().then(channel => {
            interaction.reply({content: `Done. ${channel.name} was deleted`, ephemeral: true})
        });
        return interaction.channel.delete()

    } else if (interaction.options.getSubcommand() === 'messages') {

        const amount = interaction.options.getNumber('number')
    if (amount <= 1 || amount > 100) {
			return interaction.reply('you need to input a number between 1 and 99.');
		}

		interaction.channel.bulkDelete(amount, true)
            
            return interaction.reply(`Deleted ${amount} messages`)
    }
    }
}