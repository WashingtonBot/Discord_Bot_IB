const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const ms = require('ms')
const warndb = require('../models/warnDbModel')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('mute a member of the server')
    .addUserOption(option => option.setName('user').setDescription('which member will be muted').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('the reason').setRequired(true))
    .addStringOption(option => option.setName('time').setDescription('time').setRequired(true)),


async execute(interaction) {
    const user = interaction.options.getMember('user');
        const time = interaction.options.getString('time') 
        const reason = interaction.options.getString('reason')

    if (user.isCommunicationDisabled() === true) 
    return interaction.reply('Can\'t perform this action')

        user.timeout(ms(time), `${reason}`)

        warndb.findOne({
            guild: interaction.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: interaction.guild.id,
                    user: user.user.id,
                    mute: [{
                        moderator: interaction.user.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: interaction.user.id,
                    reason: reason
                }
                data.mute.push(object)
            }
            data.save()
        })

        const embed = new EmbedBuilder()
            .setAuthor({name: 'Moderation'})
            .setDescription(`${user} have been timeout by ${interaction.user} \n Reason : ${reason} \n He is muted for ${time}`)
            .setColor('DarkRed')
            
            interaction.channel.send({embeds: [embed]})
            interaction.reply({content: 'Done', ephemeral : true})
}
}