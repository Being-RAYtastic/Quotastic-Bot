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
]

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = (client, message) => {
    if (message.author.bot) return

    if (greetings_wordList.some(word => ((message.content).toLowerCase()).includes(word))) {
        const randomGreetingPhrase = Math.floor(Math.random() * greetings_wordList.length)
        message.channel.send(`${capitalizeFirstLetter(greetings_wordList[randomGreetingPhrase])}!`)
    }
}