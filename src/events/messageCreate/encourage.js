const { Client, Message } = require("discord.js")
const sad_words = require("../../data/sadWordsList")
const encouraging_words = require("../../data/encouragingWordsList")

/**
 * 
 * For Autocompletion purposes
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = (client, message) => {
    if (message.author.bot) return

    if (sad_words.some(word =>
        (
            (
                (message.content).toLowerCase()
            ).split(' ')
        ).includes(word)
    )) {
        let randomEncouragingPhrase = Math.floor(Math.random() * encouraging_words.length)
        message.reply(encouraging_words[randomEncouragingPhrase])
    }
}