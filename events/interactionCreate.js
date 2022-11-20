const {PermissionFlagsBits, EmbedBuilder, ChannelType, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return
	   if (interaction.customId === 'unlock') {
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator, false)) {
			return interaction.reply('You can\'t do this')
		}
		const role1 = interaction.guild.id

		if (interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages) === true)
		return interaction.reply({ content: 'You can\'t do this', ephemeral: true })
			

		interaction.channel.permissionOverwrites.set([
			{
				id: interaction.guild.id,
				allow: [PermissionFlagsBits.SendMessages],
			}])
			
			const embed2 = new EmbedBuilder()
				.setDescription(`🔓 ${interaction.channel} est dévérouillé `)
				.setColor('Gold')

				interaction.channel.send({ embeds: [embed2] })
				interaction.channel.edit({ name: `${interaction.channel.name}` })
                interaction.reply({ content: 'Done', ephemeral: true })

				

			
		if (!interaction.isButton()) return;	
	}   if (interaction.customId === 'ticket' ) {

		interaction.reply({content: 'Saved ! ', ephemeral: true })


		interaction.guild.channels.create({
            name: `『📚』・ ${interaction.user.tag}`,
			type: ChannelType.GuildText,
			parent: '929117315990159431',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],


                 },

		 {
                    id: interaction.user.id ,
                    allow: [PermissionFlagsBits.ViewChannel],
		    deny: [PermissionFlagsBits.SendMessages]

					
                 },
            ],

		}).then(channel => {
			const row1 = new ActionRowBuilder()
        .addComponents(
			new SelectMenuBuilder()
			.setCustomId('type')
			.setPlaceholder('Type of ticket')
			.addOptions(
				{
					label: '『✅』 Support',
					description: 'This is a description',
					value: 'Sticket',
				},
				{
					label: '『🔊』 Demand',
					description: 'This is also a description',
					value: 'Dticket',
				},
				{
					label: '『🤝』 Partenariat',
					description: 'This is also a description',
					value: 'Paticket',
				},
				{
					label: '『📛』 Problem',
					description: 'This is also a description',
					value: 'Pticket',
				},
			),
		)

		const embed1 = new EmbedBuilder()
		.setTitle('Type of Issue')
		.setDescription('**Please choose your issue**')
		.setColor('Gold')
		.setImage('https://www.itweapons.com/wp-content/uploads/bfi_thumb/IT-Support--pgst3pl0uqsyqjnduj32loemo6ukas1vrxwrsopsq4.png')


		channel.send({content: 'Hello, a helper will soon come help you 💬', components: [row1], embeds: [embed1]})


		
		})


	
	} else if (interaction.customId === 'close') {
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator, false)) {
			return interaction.reply('You can\'t do this')
		}
		interaction.reply({content: 'Saved ! ', ephemeral: true })
		interaction.channel.delete()
		const embed1 = new EmbedBuilder()
			.setTitle('Ticket Close')
			.setDescription(`Ticket closed by ${interaction.user}`)
			.setColor('Green')
		const channel1 = interaction.guild.channels.cache.get('1012476565776506992')
		channel1.send({ embeds: [embed1] })

	} else if (interaction.customId === 'solve') {
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator, false)) {
			return interaction.reply('You can\'t do this')
		}
		interaction.reply({content: 'Saved ! ', ephemeral: true })
		interaction.channel.delete()
		const embed1 = new EmbedBuilder()
			.setTitle('Ticket Solved')
			.setDescription(`Ticket solved by ${interaction.user}`)
			.setColor('Green')
		const channel1 = interaction.guild.channels.cache.get('1012476565776506992')
		channel1.send({ embeds: [embed1] })
	}

}
}
