const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const axios = require('axios')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('memes')
    .setDescription('send a random meme'), 

    async execute(interaction) {
        let res =  await axios.default.get(
            `https://www.reddit.com/r/memes/random/.json`
        );


    res = res.data[0].data.children[0].data;

    const Embed = new EmbedBuilder()
    .setAuthor({name: `${res.author}`, iconURL: 'https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png', url: 'https://www.reddit.com/r/memes/'})
    .setColor('Orange')
    .setTitle(res.title)
    .setDescription(`${res.subreddit_name_prefixed} \n Postée le <t:${res.created}:D> à <t:${res.created}:t>`)
    .setImage(res.url)
    .setURL(`https://www.reddit.com${res.permalink}`)
    .setFooter({text: `👍 ${res.ups} 💬 ${res.num_comments} 🏆 ${res.total_awards_received}`});
    interaction.reply({embeds: [Embed]})

    }
}