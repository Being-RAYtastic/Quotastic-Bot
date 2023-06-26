require('dotenv').config()
const TOKEN = process.env.TOKEN
const { Client, IntentsBitField,} = require("discord.js")
const eventHandler = require('./handlers/eventHandler')
// const keepAlive = require('./server');


// * client is our BOT INSTANCE
const client = new Client({
    // ! Intents are the events that the bot can listen to
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})


eventHandler(client)

// keepAlive()
client.login(TOKEN)