const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'add',
    description: 'Adds 2 numbers',
    // devOnly: boolean,
    // testOnly: boolean,
    options: [
        {
            name: "first-number",
            description: "Enter first number",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "second-number",
            description: "Enter second number",
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    // deleted: true,

    callback: (client, interaction) => {
        // interaction.reply(`Pong! I am not sleeping..\nLatency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value
        // console.log(num1+num2)
        interaction.reply(`${num1+num2}`)
    }
}