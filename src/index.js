require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js")
const { quotes } = require('./quotes')


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

let status = [
    {
        name: 'In Beta',
        type: ActivityType.Playing,
    },
    {
        name: 'In Beta Mode',
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley "
    },
]

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`)      // *You can use "username" or "id" also instead of "tag"

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length)
        client.user.setActivity(status[random])
    }, 60000);
})

// * Messaging Events
client.on('messageCreate', (message) => {
    if (message.author.bot) return
    if ((message.content).toLowerCase() == "hello") message.reply("HELLO")
})


// * Interaction Events
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value
        const num2 = interaction.options.get('second-number').value

        interaction.reply(`The sum of ${num1} and ${num2} is ${num1 + num2}`)
    }

    if (interaction.commandName === 'ping') interaction.reply(`Pong! I am not sleeping..\nLatency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

    if (interaction.commandName === 'quote') {
        const randomquote = Math.floor(Math.random() * quotes.length)
        const quote = quotes[randomquote].split('~')[0]
        const author = quotes[randomquote].split('~')[1]

        const embed = new EmbedBuilder()
            .setTitle(quote)
            .setDescription(`~ ${author}`)
            .setColor('Purple')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

        interaction.reply({ embeds: [embed] })
    }
})


client.login(process.env.TOKEN)