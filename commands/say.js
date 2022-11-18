const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('say what you want as someone')
        .addStringOption(option => option.setName('content').setDescription('the message').setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('the user to imitate')),

    async execute(interaction) {
        const content = interaction.options.getString('content')
        const target = interaction.options.getUser('target') || interaction.user

        interaction.channel.createWebhook({
            name: 'Some-username',
            avatar: 'https://i.imgur.com/AfFp7pu.png',
        }).then(webhookClient => {
        const embed = new EmbedBuilder()
        .setTitle(`I Said`)
        .setColor('Random')
        .setDescription(`${content}`)
        .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))

        webhookClient.send({
            content: `**Message:**`,
            username: target.username,
            avatarURL: target.avatarURL(),
            embeds: [embed],
        });

        interaction.reply({ content: 'Done', ephemeral: true })
    })

    }
}