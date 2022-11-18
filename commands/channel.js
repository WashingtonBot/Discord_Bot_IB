const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Different moderations actions on channels')
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('lock a channel')
                .addChannelOption(option => option.setName('channel').setDescription('which channel')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('unlock a channel')
                .addChannelOption(option => option.setName('channel').setDescription('which channel')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('creates a channel')
                .addStringOption(option => option.setName('name').setDescription('name of the channel').setRequired(true))
                .addChannelOption(option => option.setName('category').setDescription('the category in which you want to create the channel').setRequired(true))
                .addStringOption(option => option.setName('type').setDescription('the type of the channel').addChoices(
                { name: 'Voice', value: `${ChannelType.GuildVoice}` },
                { name: 'Text', value: `${ChannelType.GuildText}` },
                { name: 'Stage', value: `${ChannelType.GuildStageVoice}` },
                { name: 'News', value: `${ChannelType.GuildNews}` },).setRequired(true))),

    async execute(interaction) {

        const channel = interaction.channel
        if (interaction.options.getSubcommand() === 'lock') {

            const channel1 = interaction.options.getChannel('channel')
            const role1 = interaction.guild.id

            if (channel1) {

                if (channel1.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages) === false)
                    return interaction.reply({ content: 'You can\'t do this', ephemeral: true })



                channel1.permissionOverwrites.create(role1, { SendMessages: false })

                const embed1 = new EmbedBuilder()
                    .setDescription(`🔒 ${channel1} est vérouillé `)
                    .setColor('Gold')

                const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
                    .setCustomId('unlock')
                    .setLabel('Unlock Channel')
                    .setEmoji('🔓')
                    .setStyle(ButtonStyle.Danger)
                )



                channel1.send({ embeds: [embed1], components: [row] })
                channel1.edit({ name: `${channel1.name}` })
                interaction.reply({ content: 'Done',  ephemeral: true })

            } else

                if (interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages) === false)
                    return interaction.reply({ content: 'You can\'t do this', ephemeral: true })



            interaction.channel.permissionOverwrites.create(role1, { SendMessages: false })

            const embed2 = new EmbedBuilder()
                .setDescription(`🔒 ${interaction.channel} est vérouillé `)
                .setColor('Gold')

                const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
                    .setCustomId('unlock')
                    .setLabel('Unlock Channel')
                    .setEmoji('🔓')
                    .setStyle(ButtonStyle.Danger)
                )

            interaction.channel.send({ embeds: [embed2], components: [row] })
            interaction.channel.edit({ name: `🔒 ${interaction.channel.name}` })
            interaction.reply({ content: 'Done',  ephemeral: true })



        } else if (interaction.options.getSubcommand() === 'unlock') {

            const channel2 = interaction.options.getChannel('channel')
            const role1 = interaction.guild.id

            if (channel2) {

                if (channel2.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages) === true)
                    return interaction.reply({ content: 'You can\'t do this', ephemeral: true })

                    channel2.permissionOverwrites.set([
                        {
                            id: interaction.guild.id,
                            allow: [PermissionFlagsBits.SendMessages],
                        }])

                const embed1 = new EmbedBuilder()
                    .setDescription(`🔓 ${channel2} est dévérouillé `)
                    .setColor('Gold')
                channel2.send({ embeds: [embed1] })
                channel2.edit({ name: `${channel.name}` })
                interaction.reply({ content: 'Done', ephemeral: true })
            } else {

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
                interaction.channel.edit({ name: `${channel.name}` })
                interaction.reply({ content: 'Done', ephemeral: true })








            }

        } else if (interaction.options.getSubcommand('create')) {

            const name = interaction.options.getString('name')
            const category = interaction.options.getChannel('category')
            const type = interaction.options.getString('type')




            interaction.guild.channels.create({
                name: `『📚』・${name}`,
                type: type,
                parent: category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        deny: [PermissionFlagsBits.ManageChannels],
                    },
                ],


            })

            interaction.reply({ content: 'Done', ephemeral: true });



        } 
    }
}