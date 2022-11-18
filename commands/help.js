const { SlashCommandBuilder, EmbedBuilder, InteractionType} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help command')
        .addStringOption(option =>
			option.setName('command')
				.setDescription('Phrase to search for')
                .setRequired(true)
				.setAutocomplete(true)),
                async execute(interaction) {


    				const command = interaction.options.getString('command')
                    const cmd = interaction.client.commands.get(command)

                    console.log(cmd.data)

                    const d1 = new EmbedBuilder()
                    .setTitle(`Command ${cmd.data.name}`)
                    .setDescription(`**Usage :** ${cmd.data.description} \n **Number of Options :** ${cmd.data.options.length} \n `)
                    .setColor('Random')
                    .setThumbnail('https://www.freeiconspng.com/thumbs/ask-icon/ask-icon-23.jpg')
			    	interaction.reply({embeds: [d1]})
                    

    }
}
