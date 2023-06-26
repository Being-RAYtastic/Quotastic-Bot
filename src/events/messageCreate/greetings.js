const { Client, Message } = require("discord.js")
const emojis = require('../../data/discordEmojiList')
const capitalizeFirstLetter = require("../../utils/capitalizeFirstLetter")
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

const greetings_wordList = [
    "hello",
    "hi",
    "ahoy",
    "yo",
    "ayo",
    "hiya",
    "hey there",
    "hola",
    "hey",
    "hoya",
    "bonjour",
    "namaste",
    "konichiwa",
    "kon'nichiwa",
]

module.exports = (client, message) => {
    try {
        if (message.author.bot) return

        const greetingMessageFromUser = greetings_wordList.some(word =>
            (
                (
                    (message.content).toLowerCase()
                ).split(' ')
            ).includes(word)
        )


        if (greetingMessageFromUser) {
            const randomGreetingPhrase = Math.floor(Math.random() * greetings_wordList.length)
            message.channel.send(`${capitalizeFirstLetter(greetings_wordList[randomGreetingPhrase])}! ${emojis.elegant_cheems}`)
        }
    } catch (error) {
        console.log(`Some Error occurred: ${error}`)
    }
}
