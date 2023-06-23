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
    if (sad_words.some(word => ((message.content).toLowerCase()).includes(word))) {
        let randomEncouragingPhrase = Math.floor(Math.random() * encouraging_words.length)
        message.reply(encouraging_words[randomEncouragingPhrase])
    }
}