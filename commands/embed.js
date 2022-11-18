const {EmbedBuilder, SlashCommandBuilder} =require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('build an embed')
    .addChannelOption(option => option.setName('channel').setDescription('which channel').setRequired(true))
    .addStringOption(option => option.setName('title').setDescription('the title').setRequired(true))
    .addStringOption(option => option.setName('content').setDescription('the text of the embed').setRequired(true))
    .addStringOption(option => option.setName('image').setDescription('the image'))
    .addStringOption(option => option.setName('thumbail').setDescription('the thumbail'))
    .addStringOption(option => option.setName('url').setDescription('the title url'))
    .addStringOption(option => option.setName('color').setDescription('the color in hex or letters like this : Red'))
    .addStringOption(option => option.setName('author').setDescription('the author'))
    .addStringOption(option => option.setName('authorurl').setDescription('the author url'))
    .addStringOption(option => option.setName('authorpfp').setDescription('author image'))
    .addStringOption(option => option.setName('footer').setDescription('footer content'))
    .addStringOption(option => option.setName('footerpfp').setDescription('footer image'))
    .addAttachmentOption(option => option.setName('attimage').setDescription('an attached image to the embed')),

  
     

    async execute(interaction) {

        

        
   const channel = interaction.options.getChannel('channel')
   const title = interaction.options.getString('title')
   const content = interaction.options.getString('content')
   const image = interaction.options.getString('image')
   const thumbnail = interaction.options.getString('thumbnail')
   const url = interaction.options.getString('url')
   const color = interaction.options.getString('color')
   const author  = interaction.options.getString('author')
   const authorurl = interaction.options.getString('authorurl')
   const authorpfp  = interaction.options.getString('authorpfp')
   const footer  = interaction.options.getString('footer')
   const footerpfp  = interaction.options.getString('footerpfp')
   const attimage = interaction.options.getAttachment('attimage')
 



if (attimage) {
    const exampleEmbed100 = new EmbedBuilder()
   .setDescription(content)
   .setImage(image)
   .setTitle(title)
   .setColor(color)
   .setURL(url)
   .setThumbnail(thumbnail)
   .setAuthor({name: author, iconURL: authorpfp, url: authorurl})
   .setFooter({text: footer, iconURL: footerpfp})

   await interaction.reply({content: 'Done', ephemeral: true})
   channel.send({embeds: [exampleEmbed100], files: [attimage]});

   

} else {




   const exampleEmbed100 = new EmbedBuilder()
   .setDescription(content)
   .setImage(image)
   .setTitle(title)
   .setColor(color)
   .setURL(url)
   .setThumbnail(thumbnail)
   .setAuthor({name: author, iconURL: authorpfp, url: authorurl})
   .setFooter({text: footer, iconURL: footerpfp})

    

   await interaction.reply({content: 'Done', ephemeral: true})
   channel.send({embeds: [exampleEmbed100]});


  

}
    }
        
    
        
    
}