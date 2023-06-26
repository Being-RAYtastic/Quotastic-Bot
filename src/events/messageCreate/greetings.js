const { Client, Message } = require("discord.js")
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
]
// const word = "hello";
// const regex = new RegExp(`/\b${word}\b/`);

// /\bword\b/.test
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
            message.channel.send(`${capitalizeFirstLetter(greetings_wordList[randomGreetingPhrase])}!`)
        }
    } catch (error) {
        console.log(`Some Error occurred: ${error}`)
    }
}


