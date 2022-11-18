const {PermissionFlagsBits, EmbedBuilder, ChannelType, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        
			const rowC = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('close')
				.setLabel('Close a Ticket')
				.setEmoji('🔒')
				.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
				.setCustomId('solve')
				.setLabel('Solved Ticket')
				.setEmoji('📈')
				.setStyle(ButtonStyle.Success)
			)
	
	
			const embedC = new EmbedBuilder()
			.setTitle('Close Tickets')
			.setDescription('**Close a Ticket**')
			.setColor('DarkRed')
	
	
	
			if (!interaction.isSelectMenu()) return;
			if (interaction.customId === 'type') {
				if (interaction.values[0] === 'Sticket') {
                    interaction.channel.bulkDelete(1, true)
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.SendMessages],
                        },
                    ])
					interaction.channel.setName(`support ${interaction.channel.name}`)
					interaction.channel.send({embeds: [embedC], components: [rowC]})
					interaction.reply({content: 'Saved ! ', ephemeral: true })
	
							
				} else if (interaction.values[0] === 'Dticket') {
                    interaction.channel.bulkDelete(1, true)
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.SendMessages],
                        },
                    ])
					interaction.channel.setName(`demand ${interaction.channel.name}`)
					interaction.channel.send({embeds: [embedC], components: [rowC]})
					interaction.reply({content: 'Saved ! ', ephemeral: true })
	

				} else if (interaction.values[0] === 'Paticket') {
                    interaction.channel.bulkDelete(1, true)
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.SendMessages],
                        },
                    ])
					interaction.channel.setName(`Partner ${interaction.channel.name}`)
					interaction.channel.send({embeds: [embedC], components: [rowC]})
					interaction.reply({content: 'Saved ! ', ephemeral: true })

				} else if (interaction.values[0] === 'Pticket') {
                    interaction.channel.bulkDelete(1, true)
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.SendMessages],
                        },
                    ])
					interaction.channel.setName(`Problem ${interaction.channel.name}`)
					interaction.channel.send({embeds: [embedC], components: [rowC]})
					interaction.reply({content: 'Saved ! ', ephemeral: true })
				}
			}
		
}
}