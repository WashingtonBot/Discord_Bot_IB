const warndb = require('../models/warnDbModel')
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('warn an user')
    .addUserOption(option => option.setName('user').setDescription('user to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('reason').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')


        warndb.findOne({
            guild: interaction.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: interaction.guild.id,
                    user: user.user.id,
                    warn: [{
                        moderator: interaction.user.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: interaction.user.id,
                    reason: reason
                }
                data.warn.push(object)
            }
            data.save()
      
        })
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
             const TestEmbed146 = new EmbedBuilder()
             .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
             .setColor('Blue')
             .setTitle('Logs')
             .setDescription(`Infos Warn ${user}`)
             .addFields(
               {
                 name: 'Modérateur',
                 value: `${interaction.user}`
               },
               {
                 name: 'Action',
                 value: 'Warn'
               },
               {
                 name: 'Raison',
                 value: `${reason}`
               }
             )
             const channel789 = interaction.client.channels.cache.get('1012476565776506992');
             channel789.send({embeds: [TestEmbed146]})
             interaction.reply({content: 'Done', ephemeral: true })
    }

}