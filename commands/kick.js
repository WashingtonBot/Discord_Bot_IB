const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a member out of the server')
    .addUserOption(option => option.setName('user').setDescription('which member will be kicked').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('the reason').setRequired(true)),


async execute(interaction) {
    const member = interaction.options.getMember('user');   
    const reason = interaction.options.getString('reason');
        member.kick() 

        const TestEmbed146 = new EmbedBuilder()
				  .setAuthor({name:`${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({format: 'png' , dynamic: true})}`})
				  .setColor('Red')
				  .setTitle('Logs')
				  .setDescription(`Infos Kick ${member}`)
				  .addFields(
					{
					  name: 'Modérateur',
					  value: `${interaction.user}`
					},
					{                  
					  name: 'Action',
					  value: 'Kick'
					},
					{
					  name: 'Raison',
					  value: `${reason}`
					}
				  )

				  

        const channel4 = interaction.client.channels.cache.get('1012476565776506992')


        channel4.send({embeds: [TestEmbed146]})
		interaction.reply({content: 'Done', ephemeral: true })

}
}
