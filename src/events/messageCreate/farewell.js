const { Client, Message } = require("discord.js")
const emojis = require('../../data/discordEmojiList')
const capitalizeFirstLetter = require("../../utils/capitalizeFirstLetter")
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

const farewell_wordList = [
    "bye",
    "see you soon", "see u soon",
    "goodbye",
    "byebye",
    "tata",
    "see ya",
    "alvida",
    "au revoir",
    "sayonara",
]

module.exports = (client, message) => {
    try {
        if (message.author.bot) return

        const farewellMessageFromUser = farewell_wordList.some(word =>
            (
                (
                    (message.content).toLowerCase()
                ).split(' ')
            ).includes(word)
        )


        if (farewellMessageFromUser) {
            const randomFarewellPhrase = Math.floor(Math.random() * farewell_wordList.length)
            message.channel.send(`${capitalizeFirstLetter(farewell_wordList[randomFarewellPhrase])}! ${emojis.cheems_blanket}`)
        }
    } catch (error) {
        console.log(`Some Error occurred: ${error}`)
    }
}
