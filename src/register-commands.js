require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

const commands = [
    {
        name: 'add',
        description: 'Add 2 numbers',
        options: [
            {
                name: 'first-number',
                description: 'Enter first no.',
                type: ApplicationCommandOptionType.Number,
                // choices: [
                //     {
                //         name: 'one',
                //         value: 1,
                //     },
                //     {
                //         name: 'two',
                //         value: 2,
                //     },
                //     {
                //         name: 'three',
                //         value: 3,
                //     },
                // ],
                required: true,
            },
            {
                name: 'second-number',
                description: 'Enter second no.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'ping',
        description: 'Pong!'
    },
    {
        name: 'quote',
        description: 'sends a random quote',
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);   // ! Add this semicolon at the end  

(async () => {
    try {
        console.log("Registering Slash Commands...")
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log("Slash Commands Registered Successfully")
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})()