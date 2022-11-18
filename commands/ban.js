const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Colors } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option => option.setName('user').setDescription('user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason of the ban').setRequired(true)),

    async execute(interaction) {


         
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')

        interaction.guild.members.ban(user)

        const TestEmbed146 = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Logs')
            .setDescription(`Infos Ban ${user}`)
            .addFields(
                {
                    name: 'Modérateur',
                    value: `${interaction.user}`
                },
                {
                    name: 'Action',
                    value: 'Ban'
                },
                {
                    name: 'Raison',
                    value: `${reason}`
                }
            )
        const channel789 = interaction.client.channels.cache.get('1012476565776506992');
        channel789.send({ embeds: [TestEmbed146] })
        interaction.reply({ content: 'Done', ephemeral: true })

    }
}