const warndb = require('../models/warnDbModel')
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('warnings of an user')
    .addUserOption(option => option.setName('user').setDescription('user to warn').setRequired(true)),

async execute(interaction) {

    const user = interaction.options.getMember('user')



    warndb.findOne({
        guild: interaction.guild.id,
        user: user.user.id
    }, async (err, data) => {
        if (err) throw err
        if (data) {
            const e = data.warn.map(
                (w, i) => `\n\`${i + 1}\` - Moderator: ${interaction.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
            )
            const f = data.mute.map(
                (w, i) => `\n\`${i + 1}\` - Moderator: ${interaction.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
            )
            const embed = new EmbedBuilder()
                .setTitle(`${user.user.username} Warnings`)
                .setThumbnail(user.displayAvatarURL({dynamic: true }))
                .setDescription(`**Warns :** ${e.join('')} \n **Mutes:** ${f.join('')} `)
            interaction.reply({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
            .setTitle(`${user.user.username} Warnings`)
            .setThumbnail(user.displayAvatarURL({dynamic: true }))
            .setDescription('This user does not have any warnings')
            .setColor('Random')
            interaction.reply({ embeds: [embed] })

        }
    })
}
}