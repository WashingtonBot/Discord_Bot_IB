const {ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, SlashCommandBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, ComponentType} = require('discord.js');
const suggestdb = require('../models/suggestDbModel')
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('suggest an idea'),

    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('Sugestion System');


		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('suggestT')
			.setLabel("What's the name of your suggestion")
			.setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter some text!')
            .setRequired(true)

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('suggestI')
			.setLabel("Explain your suggestion")
			.setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Enter some text!')
            .setRequired(true)


		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);


		modal.addComponents(firstActionRow, secondActionRow);


		await interaction.showModal(modal);

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yes')
					.setEmoji('🟩')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('no')
					.setEmoji('🟥')
					.setStyle(ButtonStyle.Primary),
			);

			const row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yes')
					.setEmoji('🟩')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('no')
					.setEmoji('🟥')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			);

            var iFor = 0
            var iAgi = 0
            var Diff = iFor - iAgi ;


            interaction.channel.send({content: `**Votes \n Votes pour : ${iFor}** \n *Votes contre ${iAgi}*`, components: [row]}).then( message => {
               
               const time = ms('1m')
                
    
    
            const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: time });;
            collector.on('collect', async i => {
    
    
    
    
                const choice = i.customId;
    
                suggestdb.findOneAndReplace({
                    guild: interaction.guild.id,
                    message: interaction.id
                }, async (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        data = new suggestdb({
                            guild: interaction.guild.id,
                            message: interaction.id,
                            votes: [{
                                yes: 0,
                                no: 0
                            }],
    
    
                        })
    
                        data.save()
    
                    } else {
                        iFor = data.votes[0].yes;
                        iAgi = data.votes[0].no;
    
                    }
    
    
    
                    if (choice === 'yes') {
    
    
    
                        iFor = iFor + 1
    
                        i.reply({ content: 'Voted', ephemeral: true })
                        message.edit({content: `**Votes** \n *Votes pour : ${iFor}* \n *Votes contre ${iAgi}*`, components: [row]})
    
    
    
    
    
                    } else if (choice === 'no') {
    
    
    
    
    
    
                        iAgi = iAgi + 1
    
                        i.reply({ content: 'Voted', ephemeral: true })
                        message.edit({content: `**Votes** \n *Votes pour : ${iFor}* \n *Votes contre ${iAgi}*`, components: [row]})
    
    
    
    
    
                    }
                    data.votes[0].yes = iFor
                    data.votes[0].no = iAgi
                    Diff = iFor - iAgi
    
                }) 
                collector.on('end', () => {

                    message.edit({content: `**Votes Terminés !** \n *Votes pour : ${iFor}* \n *Votes contre ${iAgi}* \n *Opinion ${Diff}*`, components: [row1]})

                    
        
                });
        })
            })

          


    }
}