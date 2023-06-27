const { animeQuotes } = require('../../data/animeQuotes')

const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'anime-quote',
    description: 'sends a random anime quote',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: Object[],
    // deleted: boolean


    callback: (client, interaction) => {
        const randomQuote = Math.floor(Math.random() * animeQuotes.length)
        const animeQuote = animeQuotes[randomQuote].split('~')[0]
        const author = animeQuotes[randomQuote].split('~')[1]

        const embed = new EmbedBuilder()
            .setTitle(animeQuote)
            .setDescription(`~ ${author}`)
            .setColor('Purple')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

        interaction.reply({ embeds: [embed] })
    }
}