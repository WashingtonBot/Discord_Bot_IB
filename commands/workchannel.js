const ms = require('ms')
const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors, ChannelType, PermissionFlagsBits} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('workchannel')
    .setDescription('create a vocal work channel for a certain amount of time')
    .addNumberOption(option => option.setName('limit').setDescription('maximum of person in this channel').setRequired(true))
    .addStringOption(option => option.setName('time').setDescription('how long will the channel last for').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('name of the new channel').setRequired(true)),

    async execute(interaction) {
        

        const amount = interaction.options.getNumber('limit')
		if (amount <= 1 || amount > 99) {
			return interaction.reply('you need to input a number between 1 and 99.');
		}

      const name = interaction.options.getString('name')

		interaction.guild.channels.create({
            name: `『📚』・${name}`,
			type: ChannelType.GuildVoice,
			parent: '868490606639464469',
			userLimit: amount,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    deny: [PermissionFlagsBits.MoveMembers],
                 },
            ],

		}).then(channel => {



		const duree = interaction.options.getString('time')
		setTimeout(() => {
			if (channel.members.size = 0) {
			channel.delete()
			interaction.editReply('Salon Supprimé Automatiquement')
		} 
        else {
			const embed = new EmbedBuilder()
				.setTitle(`Temps épuisé`)
				.setDescription(`Votre temps est écoulé. Cliquez sur les boutons pour soit continuer, soit arrêter \n Vous devez répondre en moins de 1 minute, autrement votre salon se verra accorder un temps illimité`)
				.setColor('Grey')
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('temps+')
						.setLabel('Plus de Temps')
						.setEmoji('✅')
						.setStyle(ButtonStyle.Primary),
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId('temps-')
						.setLabel('Arrêt du Salon')
						.setEmoji('🟥')
						.setStyle(ButtonStyle.Primary),
				);
			interaction.editReply({content: `${interaction.user}`, embeds: [embed], components: [row] })

			const row41 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('temps+')
				.setLabel('Plus de Temps')
				.setEmoji('✅')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(true)
		)
		.addComponents(
			new ButtonBuilder()
				.setCustomId('temps-')
				.setLabel('Arrêt du Salon')
				.setEmoji('🟥')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(true)
		);




		const embed8 = new EmbedBuilder()
		.setTitle(`Temps Ajouté !`)
		.setDescription(`${interaction.user} Votre temps est désormais illimité !`)
		.setColor('Green')

		const embed9 = new EmbedBuilder()
		.setTitle(`Salon Détruit`)
		.setDescription(`${interaction.user} Votre salon a été supprimé`)
		.setColor('Red')





		const filter = i => i.user.id === `${i.user.id}`;

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

		collector.on('collect', async i => {
			if (i.customId === 'temps+') {
				await i.reply({ content: 'C\'est Noté !', embeds: [embed8], ephemeral: true });
				interaction.editReply({ embeds: [embed], components: [row41] })
			}
			if (i.customId === 'temps-') {
				await i.reply({ content: 'C\'est Noté !', embeds: [embed9], ephemeral: true });
				interaction.editReply({ embeds: [embed], components: [row41] })
				channel.delete()



			}
		});

		collector.on('end', collected => 
		interaction.editReply({ content: 'Interaction Terminée', components: [row41] })
		
		);
	}
		}, ms(duree))

	})
		

		interaction.reply('Terminé !')

    }
}