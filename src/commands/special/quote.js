const { quotes } = require('../../data/quotes')

const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'quote',
    description: 'sends a random quote',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: Object[],
    // deleted: boolean


    callback: (client, interaction) => {
        const randomQuote = Math.floor(Math.random() * quotes.length)
        const quote = quotes[randomQuote].split('~')[0]
        const author = quotes[randomQuote].split('~')[1]

        const embed = new EmbedBuilder()
            .setTitle(quote)
            .setDescription(`~ ${author}`)
            .setColor('Purple')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

        interaction.reply({ embeds: [embed] })
    }
}