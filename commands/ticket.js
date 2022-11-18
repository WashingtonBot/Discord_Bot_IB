const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('initialise tickets system'),

    async execute(interaction) {

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('Open Ticket')
            .setEmoji('📩')
            .setStyle(ButtonStyle.Secondary)
        )
        const channel = interaction.client.channels.cache.get('1042885240261202030')

        const embed = new EmbedBuilder()
        .setTitle('Tickets')
        .setDescription('**Open a Ticket** \n A helper will come for your issue \n *Please choose the button according to your request/problem*')
        .setColor('Grey')

        channel.send({embeds: [embed], components: [row]})

        interaction.reply({content: 'Initialised ! ', ephemeral: true })
    }
}