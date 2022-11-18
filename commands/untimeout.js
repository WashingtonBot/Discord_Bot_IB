const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('unmute a member of the server')
    .addUserOption(option => option.setName('user').setDescription('which member will be muted').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('the reason').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason')

        if (user.isCommunicationDisabled() === false) 
        return interaction.reply('Can\'t perform this action')

        user.timeout(null, `${reason}`)

        const embed = new EmbedBuilder()
            .setAuthor({name: 'Moderation'})
            .setDescription(`${user} have been untimeout by ${interaction.user} \n Reason : ${reason} \n`)
            .setColor('DarkBlue')
            
            interaction.channel.send({embeds: [embed]})
            interaction.reply({content: 'Done', ephemeral : true})

    }
}